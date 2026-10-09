"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OrderStatusChart({ data }: { data: any[] }) {
    const labels = data.map((d) => d.status);
    const values = data.map((d) => d._count.id);

    const statusColors: Record<string, string> = {
        PENDING: "#FFB300",
        APPROVED: "#2196F3",
        PACKING: "#FF9800",
        DISPATCHED: "#4CAF50",
        DELIVERED: "#2E7D32",
        CANCELLED: "#F44336",
    };

    return (
        <Doughnut
            data={{
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: labels.map((l) => statusColors[l] || "#9E9E9E"),
                    borderWidth: 1,
                }],
            }}
            options={{
                responsive: true,
                plugins: {
                    legend: { position: "bottom" },
                    title: { display: true, text: "Order Status Distribution" },
                },
            }}
        />
    );
}