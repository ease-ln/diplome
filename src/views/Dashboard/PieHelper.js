import {
  generateRandomColor,
  timestrToSec,
  formatTime,
} from "./DashboardHelper";

export const getPieData = (timeByApp) => {
  const labels = [];
  const datasets = [
    {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
    },
  ];

  for (const app in timeByApp) {
    if (timeByApp.hasOwnProperty(app) && typeof timeByApp[app] === "string") {
      labels.push(app);
      datasets[0].data.push(timeByApp[app].slice());
      const newRandomColor = generateRandomColor();
      datasets[0].backgroundColor.push(newRandomColor);
      datasets[0].hoverBackgroundColor.push(newRandomColor);
    }
  }

  datasets[0].data = datasets[0].data.map((x) => timestrToSec(x));

  return {
    labels,
    datasets,
  };
};

export const getPieOptions = () => {
  return {
    maintainAspectRatio: false,
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
