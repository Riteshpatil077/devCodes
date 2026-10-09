import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const now = new Date();
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // 1. 📦 Order Status Distribution
        const orderStatusStats = await prisma.orderMaster.groupBy({
            by: ["status"],
            _count: { id: true },
        });

        // 2. 💰 Payment Status & Amounts
        const paymentStats = await prisma.invoiceMaster.groupBy({
            by: ["payment_status"],
            _count: { id: true },
            _sum: { grand_total_amount: true, balance_due: true },
        });

        // 3. 📈 Revenue & Order Trends (Last 30 Days)
        const trends = await prisma.orderMaster.groupBy({
            by: ["order_date"],
            where: { order_date: { gte: thirtyDaysAgo } },
            _count: { id: true },
            _sum: { grand_total_amount: true },
            orderBy: { order_date: "asc" },
        });

        // 4. 🥛 Category Performance (Dairy vs Magazine)
        // Aggregates via OrderItemDetail -> Product -> Category
        const categoryRaw = await prisma.orderItemDetail.groupBy({
            by: ["product_id"],
            _sum: { quantity: true, taxable_amount: true },
        });

        // Fetch categories for products
        const productIds = categoryRaw.map((i) => i.product_id);
        const products = await prisma.productMaster.findMany({
            where: { id: { in: productIds } },
            select: {
                id: true,
                productCategory: { select: { product_category_name: true } },
            },
        });

        // Aggregate by Category Name
        const categoryMap: Record<string, { quantity: number; revenue: number }> = {};
        categoryRaw.forEach((item) => {
            const prod = products.find((p) => p.id === item.product_id);
            const catName = prod?.productCategory?.product_category_name || "Uncategorized";

            if (!categoryMap[catName]) categoryMap[catName] = { quantity: 0, revenue: 0 };
            categoryMap[catName].quantity += item._sum.quantity || 0;
            categoryMap[catName].revenue += Number(item._sum.taxable_amount || 0);
        });

        // 5. 📋 KPI Calculations
        const totalOrders = await prisma.orderMaster.count();
        const pendingOrders = await prisma.orderMaster.count({ where: { status: "PENDING" } });
        const totalRevenue = await prisma.invoiceMaster.aggregate({ _sum: { grand_total_amount: true } });
        const unpaidAmount = await prisma.invoiceMaster.aggregate({ _sum: { balance_due: true } });
        const activeSubscriptions = await prisma.subscriptionMaster.count({ where: { validity_status: "VALID" } });

        return NextResponse.json({
            kpis: {
                totalOrders,
                pendingOrders,
                totalRevenue: Number(totalRevenue._sum.grand_total_amount || 0),
                unpaidAmount: Number(unpaidAmount._sum.balance_due || 0),
                activeSubscriptions,
            },
            orderStatus: orderStatusStats,
            paymentStatus: paymentStats,
            trends: trends.map((t) => ({
                date: t.order_date.toISOString().split("T")[0],
                orders: t._count.id,
                revenue: Number(t._sum.grand_total_amount || 0),
            })),
            categories: Object.entries(categoryMap).map(([name, data]) => ({
                name,
                ...data,
            })),
        });
    } catch (error) {
        console.error("❌ Analytics Error:", error);
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
    }
}