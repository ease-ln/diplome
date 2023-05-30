import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";

const PieGraph = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "My First Dataset",
        data: data.series,
        backgroundColor: [
          "#73e59b",
          "#a9e5e5",
          "#4186d7",
          "#775dd0",
          "rgb(255, 205, 86)",
          "#e9425d",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Doughnut
      data={chartData}
      options={{
        maintainAspectRatio: false,
        legend: { position: "right" },
        responsive: false,
      }}
      width={400}
    />
  );
};
export default memo(PieGraph);
