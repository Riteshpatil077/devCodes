"use client";
import { useEffect, useState } from "react";
import KpiCard from "@/components/dashboard/KpiCard";
import OrderStatusChart from "@/components/dashboard/charts/OrderStatusChart";
import PaymentStatusChart from "@/components/dashboard/charts/PaymentStatusChart";
import RevenueTrendChart from "@/components/dashboard/charts/RevenueTrendChart";
import CategoryChart from "@/components/dashboard/charts/CategoryChart";

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/analytics")
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;
    if (!data) return <div className="p-8 text-center text-red-500">Failed to load dashboard data.</div>;

    const { kpis, orderStatus, paymentStatus, trends, categories } = data;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>

            {/* 🔔 Alerts */}
            {kpis.pendingOrders > 0 && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded">
                    ⚠️ <strong>{kpis.pendingOrders} Orders</strong> are pending approval.
                </div>
            )}
            {kpis.unpaidAmount > 0 && (
                <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded">
                    💰 <strong>₹{kpis.unpaidAmount.toLocaleString()}</strong> is unpaid in invoices.
                </div>
            )}

            {/* 📈 KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KpiCard title="Total Orders" value={kpis.totalOrders.toLocaleString()} color="#2196F3" />
                <KpiCard title="Pending Orders" value={kpis.pendingOrders.toLocaleString()} subtext="Requires Approval" color="#FF9800" />
                <KpiCard title="Total Revenue" value={`₹${kpis.totalRevenue.toLocaleString()}`} color="#4CAF50" />
                <KpiCard title="Active Subscriptions" value={kpis.activeSubscriptions.toLocaleString()} subtext="Magazine/Dairy" color="#9C27B0" />
            </div>

            {/* 📊 Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <OrderStatusChart data={orderStatus} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <PaymentStatusChart data={paymentStatus} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                    <RevenueTrendChart data={trends} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                    <CategoryChart data={categories} />
                </div>
            </div>
        </div>
    );
}