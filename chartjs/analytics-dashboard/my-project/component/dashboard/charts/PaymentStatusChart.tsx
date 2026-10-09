"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PaymentStatusChart({ data }: { data: any[] }) {
    const labels = data.map((d) => d.payment_status);
    const values = data.map((d) => d._count.id);

    return (
        <Pie
            data={{
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: ["#4CAF50", "#F44336", "#FF9800"], // Paid, Unpaid, Partial
                    borderWidth: 1,
                }],
            }}
            options={{
                responsive: true,
                plugins: {
                    legend: { position: "bottom" },
                    title: { display: true, text: "Invoice Payment Status" },
                },
            }}
        />
    );
}