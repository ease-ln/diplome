import {
  generateRandomColor,
  timestrToSec,
  formatTime,
} from "./DashboardHelper";

export const getBarData = (timeByCategory) => {
  const labels = [];
  const datasets = [
    {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    },
  ];

  for (const [key, value] of Object.entries(timeByCategory)) {
    labels.push(key);
    const newRandomColor = generateRandomColor();
    datasets[0].data.push(value);
    datasets[0].backgroundColor.push(newRandomColor);
    datasets[0].hoverBackgroundColor.push(newRandomColor);
  }

  datasets[0].data = datasets[0].data.map((x) => timestrToSec(x));

  return {
    labels,
    datasets,
  };
};

export const getBarOptions = () => {
  return {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          ticks: { display: false },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: (toolTipItem, data) => {
          return (
            data["labels"][toolTipItem["index"]] +
            " " +
            formatTime(data["datasets"][0]["data"][toolTipItem["index"]])
          );
        },
      },
    },
  };
};
