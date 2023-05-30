import React from "react";

import cn from "./LineGraph.module.scss";

export const InfoBlockForApps = ({ data }) => {
  if (!data || data.length === 0) return null;

  const sum = data
    .map((item) => {
      return {
        name: item.name,
        value: item.data.reduce((a, b) => a + b, 0),
      };
    })
    .sort((a, b) => b.value - a.value);
  const getTimeForToday = () => {
    const t = sum[0].value;

    let tempDate = new Date(0);
    tempDate.setSeconds(t);
    let timeString = tempDate.toISOString().substr(11, 8);
    const hours = timeString.substr(0, 2);
    const mins = timeString.substr(3, 2);

    return { hours: hours, minutes: mins };
  };

  return (
    <DeveloperDie
      title="Mostly used App"
      content={getTimeForToday()}
      subtitle={sum[0].name}
    />
  );
};

export const InfoBlockForTime = ({ data }) => {
  if (!data || data.length === 0) return null;
  const getCurrentDate = () => {
    return (
      new Date().getDate() +
      " " +
      new Date().toLocaleString("en-US", { month: "long" })
    );
  };

  const getTimeForToday = () => {
    const t = data[0].data[data[0].data.length - 1];

    let tempDate = new Date(0);
    tempDate.setSeconds(t);
    let timeString = tempDate.toISOString().substr(11, 8);
    const hours = timeString.substr(0, 2);
    const mins = timeString.substr(3, 2);

    return { hours: hours, minutes: mins };
  };

  return (
    <DeveloperDie
      title="Spent time for today"
      content={getTimeForToday()}
      subtitle={getCurrentDate()}
    />
  );
};

export const DeveloperDie = ({ title, content, subtitle }) => {
  return (
    <>
      <div className={cn.root}>
        <p className={cn.title}>{title}</p>
        <div className={cn.container}>
          <p className={cn["container-time"]}>
            <span className={cn.time}>
              {content.hours}
              <span className={cn["time--ident"]}>h &nbsp;</span>
            </span>
            <span className={cn.time}>
              {content.minutes}
              <span className={cn["time--ident"]}>min</span>
            </span>
          </p>
          <p className={cn.date}>{subtitle}</p>
        </div>
      </div>
    </>
  );
};
