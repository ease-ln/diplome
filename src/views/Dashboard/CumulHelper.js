import {
  sampleLineConfig,
  timestrToSec,
  formatTime,
} from "./DashboardHelper.js";

export const getCumulLineData = (hourlyReport, apps) => {
  const labels = [];
  const datasets = [];
  const idxOfApps = {};
  for (let i = 0; i < apps.length; i++) {
    datasets.push(sampleLineConfig(apps[i], false));
    idxOfApps[apps[i]] = i;
  }

  for (const h in hourlyReport) {
    if (hourlyReport.hasOwnProperty(h)) {
      labels.push(h);
      for (const a in apps) {
        const app = apps[a];
        if (hourlyReport[h].hasOwnProperty(app)) {
          const appIdx = idxOfApps[app];
          datasets[appIdx].data.push(hourlyReport[h][app]);
        }
      }
    }
  }

  for (let dataset of datasets) {
    dataset.data = dataset.data.map((x) => timestrToSec(x));
  }  

  return {
    labels,
    datasets,
  };
};

export const getCumulLineOpts = () => {
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
            labelString: "Hour times during the day",
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: (toolTipItem, data) => {
          return (
            data["datasets"][toolTipItem["datasetIndex"]]["label"] +
            " " +
            formatTime(data["datasets"][0]["data"][toolTipItem["index"]])
          );
        },
      },
    },
  };
};
