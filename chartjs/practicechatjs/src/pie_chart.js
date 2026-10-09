import { Chart, Colors, PieController, ArcElement, Legend, Title, Tooltip } from "chart.js";


Chart.register(
    Colors,
    PieController,
    ArcElement,
    Legend,
    Title,
    Tooltip
);


const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
const yValues = [55, 49, 44, 24, 15];
const barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145"
];

const ctx = document.getElementById("myChart");

new Chart(ctx, {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        plugins: {
            legend: { display: true },
            title: {
                display: true,
                text: "World Wine Production 2018",
                font: { size: 16 }
            }
        }
    }
});