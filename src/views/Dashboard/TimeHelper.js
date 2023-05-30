import {
  sampleLineConfig,
  timestrToSec,
  formatTime,
} from "./DashboardHelper.js";

export const getLineData = (timeByDate) => {
  const labels = [];
  const datasets = [sampleLineConfig("All teams")];

  for (const d in timeByDate) {
    if (timeByDate.hasOwnProperty(d) && typeof timeByDate[d] === "string") {
      labels.push(d);
      datasets[0].data.push(timeByDate[d].slice());
    }
  }

  datasets[0].data = datasets[0].data.map((x) => timestrToSec(x));

  return {
    labels,
    datasets,
  };
};

export const getLineOptions = () => {
  return {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time",
          },
          ticks: { display: false },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Date",
          },
        },
      ],
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
