"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function RevenueTrendChart({ data }: { data: any[] }) {
    const labels = data.map((d) => d.date);
    const revenues = data.map((d) => d.revenue);
    const orders = data.map((d) => d.orders);

    return (
        <Bar
            data={{
                labels,
                datasets: [
                    {
                        label: "Revenue (₹)",
                        data: revenues,
                        backgroundColor: "#2196F3",
                        yAxisID: "y",
                    },
                    {
                        label: "Orders",
                        data: orders,
                        backgroundColor: "#FF9800",
                        yAxisID: "y1",
                    },
                ],
            }}
            options={{
                responsive: true,
                interaction: { mode: "index", intersect: false },
                scales: {
                    y: { type: "linear", display: true, position: "left", title: { display: true, text: "Revenue" } },
                    y1: { type: "linear", display: true, position: "right", grid: { drawOnChartArea: false }, title: { display: true, text: "Orders" } },
                },
                plugins: { title: { display: true, text: "Revenue & Orders Trend (Last 30 Days)" } },
            }}
        />
    );
}