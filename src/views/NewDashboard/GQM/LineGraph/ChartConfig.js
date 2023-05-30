export const GetChartConfig = (data, userRole, email, XAxisType) => {
  const isDev = userRole === "developer";
  const isDateTime = XAxisType === "datetime";

  const getSeries = () => {
    if (!isDateTime) return data.series;
    if (isDev) {
      return data.series.filter((item) => item.name === email);
    }
    return data.series;
  };
  const chartConfig = {
    options: {
      chart: {
        id: "area-graph",
        zoom: {
          enabled: !isDev,
          type: "x",
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: "#90CAF9",
              opacity: 0.4,
            },
            stroke: {
              color: "#0D47A1",
              opacity: 0.4,
              width: 1,
            },
          },
        },
        toolbar: {
          show: !isDev,
        },
      },
      colors: [
        "#2E93fA",
        "#74e59b",
        "#775dd0",
        "#f9cd55",
        "#269797",
        "#024488",
        "#947607",
      ],
      dataLabels: {
        enabled: false,
        formatter:
          isDateTime &&
          function (val, opts) {
            return val !== 0 ? val + "s" : undefined;
          },
      },
      xaxis: {
        type: XAxisType,
        tooltip: {
          enabled: false,
        },
        labels: {
          style: {
            fontSize: "10px",
            colors: "#8F8F8F",
          },
        },
        categories: data.dates,
      },
      tooltip: {
        x: {
          format: "dd MMM",
          formatter: undefined,
        },
        y: {
          formatter: function (val, opts) {
            return val
              ? `${new Date(val * 1000).toISOString().substr(11, 8)}`
              : undefined;
          },
        },
      },
      stroke: {
        width: 2,
      },
      markers: {
        size: isDateTime ? 0 : 4,
      },
      // legend: {position: 'left'}
    },
    series: getSeries(),
  };
  return chartConfig;
};
