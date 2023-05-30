import React, { memo, useState, useRef, useEffect } from "react";
import Chart from "react-apexcharts";

import { GetChartConfig } from "./ChartConfig";

// import cn from "./LineGraph.module.scss";

const LineGraph = ({ data, userRole, XAxisType, InfoBlock }) => {
  const ref = useRef();
  const [email] = useState(
    JSON.parse(localStorage.getItem("innometrics-email"))
  );
  const isDev = userRole === "developer";

  const chartConfig = GetChartConfig(data, userRole, email, XAxisType);

  useEffect(() => {
    ref.current.addEventListener("mousedown", (e) => e.stopPropagation());
    return () => {
      ref.current.removeEventListener("mousedown", (e) => e.stopPropagation());
    };
  }, []);

  //   const getCurrentDate = () => {
  //     return (
  //       new Date().getDate() +
  //       " " +
  //       new Date().toLocaleString("en-US", { month: "long" })
  //     );
  //   };
  //   const getTimeForToday = () => {
  //     const t = chartConfig.series[0].data[chartConfig.series[0].data.length - 1];

  //     let tempDate = new Date(0);
  //     tempDate.setSeconds(t);
  //     let timeString = tempDate.toISOString().substr(11, 8);
  //     const hours = timeString.substr(0, 2);
  //     const mins = timeString.substr(3, 2);

  //     return { hours: hours, minutes: mins };
  //   };

  const [width, setWidth] = useState();
  useEffect(() => {
    // console.log("width", ref.current.offsetWidth);
    setWidth(ref.current.offsetWidth);
    if (false) console.log(width);
  }, [ref]);

  // const getWidth = () => {
  // 	if (XAxisType !== 'datetime')
  // 		return '100%'
  // 	return isDev ? '59%' : '100%'
  // }

  return (
    <>
      <div
        style={{ display: "block", width: `${isDev ? "59%" : "100%"}` }}
        ref={ref}
      >
        <Chart
          options={chartConfig.options}
          series={chartConfig.series}
          type={XAxisType === "datetime" ? "area" : "line"}
          height="240px"
          // width={width+'px'}
          // style={{width: 'inherit'}}
        />
      </div>
      {isDev && InfoBlock && <InfoBlock data={chartConfig.series} />}
    </>
  );
};
export default memo(LineGraph);
