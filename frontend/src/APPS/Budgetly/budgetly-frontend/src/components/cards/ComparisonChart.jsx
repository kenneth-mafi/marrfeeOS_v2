import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import './styles/barChart.css';

Chart.register(...registerables);


function ComparisonChart({ incomeData, expenseData }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    chartRef.current?.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: incomeData.labels,
        datasets: [
          {
            label: "Income",
            data: incomeData.values,
            backgroundColor: "#543884",
          },
          {
            label: "Expense",
            data: expenseData.values,
            backgroundColor: "#e45f00",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: v => `${v.toLocaleString()} kr`,
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [incomeData, expenseData]);

  return (
    <div style={{ height: "220px" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default ComparisonChart;