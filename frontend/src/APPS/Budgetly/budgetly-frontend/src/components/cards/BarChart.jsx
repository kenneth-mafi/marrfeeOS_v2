import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import './styles/barChart.css';

Chart.register(...registerables);

function BarChart({ data, label, color }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // destroy previous chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label,
            data: data.values,
            backgroundColor: color,
            categoryPercentage: 0.6,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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

    return () => {
      chartRef.current?.destroy();
    };
  }, [data, label, color]);

  return (
    <div style={{ height: "220px" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default BarChart;


