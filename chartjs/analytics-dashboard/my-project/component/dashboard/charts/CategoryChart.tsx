"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CategoryChart({ data }: { data: any[] }) {
    const labels = data.map((d) => d.name);
    const quantities = data.map((d) => d.quantity);

    return (
        <Bar
            data={{
                labels,
                datasets: [{
                    label: "Quantity Sold",
                    data: quantities,
                    backgroundColor: "#4CAF50",
                }],
            }}
            options={{
                responsive: true,
                indexAxis: "y",
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: "Sales by Category (Dairy vs Magazine)" },
                },
            }}
        />
    );
}