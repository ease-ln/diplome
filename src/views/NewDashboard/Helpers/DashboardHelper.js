export function timestrToSec(timestr) {
  var parts = timestr.split(":");
  if (parts[0].includes("days")) return 0;
  if (isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) return 0;
  return +parts[0] * 3600 + +parts[1] * 60 + +parts[2];
}

export function pad(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return "" + num;
  }
}

export const generateRandomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = (num >> 8) & 255;
  var b = num & 255;
  const rgbaOpaque = `rgba(${r}, ${g}, ${b}, 1)`;
  const rgbaNonOpaque = `rgba(${r}, ${g}, ${b}, 0.4)`;
  return { rgbaOpaque, rgbaNonOpaque };
}

export function formatTime(seconds) {
  return [
    pad(Math.floor(seconds / 3600)),
    pad(Math.floor(seconds / 60) % 60),
    pad(seconds % 60),
  ].join(":");
}

export const formatDate = (date) => {
  return date.toJSON().slice(0, 10).split("-").reverse().join("/");
};

export const formatDateWithSlashes = (date) => {
  var dd = date.getDate();

  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return yyyy + "-" + mm + "-" + dd;
};

export const truncateApps = (apps, number) => {
  const sorted = [];
  Object.keys(apps).forEach((app) => {
    if (apps.hasOwnProperty(app))
      sorted.push([app, apps[app], timestrToSec(apps[app])]);
  });

  sorted.sort((a, b) => b[2] - a[2]);
  let result = {};
  sorted.slice(0, number).forEach((n) => {
    result[n[0]] = n[1];
  });

  let sumOfOthers = 0;
  sorted.slice(number, sorted.length).forEach((other) => {
    sumOfOthers += other[2];
  });

  if (sorted.slice(number, sorted.length).length > 0)
    result["Others"] = formatTime(sumOfOthers);

  return result;
};

export const groupByApp = (activityReportList) => {
  if (!activityReportList) return {};
  let apps = {};
  activityReportList.forEach((act) => {
    if (apps[act.executable_name]) {
      apps[act.executable_name] = formatTime(
        timestrToSec(apps[act.executable_name]) + timestrToSec(act.time_used)
      );
    } else {
      apps[act.executable_name] = act.time_used;
    }
  });

  return truncateApps(apps, 5);
};

export const groupByDate = (timeReportList) => {
  let dates = {};
  if (!timeReportList) return {};
  timeReportList.forEach((r) => {
    if (dates[r.activity_day]) {
      dates[r.activity_day] = formatTime(
        timestrToSec(dates[r.activity_day]) + timestrToSec(r.time_used)
      );
    } else {
      dates[r.activity_day] = r.time_used;
    }
  });

  return dates;
};

export const gropByCategory = (categoryReportList) => {
  let categories = {};
  if (!categoryReportList) return {};
  categoryReportList.forEach((r) => {
    categories[r.catname] = r.timeused;
  });
  return categories;
};

export const cumulteHourly = (reportList) => {
  const hours = {};
  const apps = [];

  reportList.forEach((r) => {
    const hourCaptured = r.capturedDate.split(" ")[1].split(":")[0];
    const hourStringified = String(Number(hourCaptured));
    if (!apps.includes(r.executable_name)) apps.push(r.executable_name);
    if (!hours[hourStringified]) hours[hourStringified] = {};
    if (hours[hourStringified][r.executable_name]) {
      hours[hourStringified][r.executable_name] = formatTime(
        timestrToSec(hours[hourStringified][r.executable_name]) +
          timestrToSec(r.used_time)
      );
    } else {
      hours[hourStringified][r.executable_name] = r.used_time;
    }
  });

  // Accumulate with previous values
  const sortedHours = sortObjectByKey(hours);
  const accumulated = {};
  apps.forEach((a) => {
    accumulated[a] = [];
  });
  const result = {};

  for (const h in sortedHours) {
    if (sortedHours.hasOwnProperty(h)) {
      result[h] = {};
      const objWithAppNames = sortedHours[h];
      for (const a in objWithAppNames) {
        if (objWithAppNames.hasOwnProperty(a)) {
          if (accumulated[a].length === 0) {
            accumulated[a].push(sortedHours[h][a]);
          } else {
            accumulated[a].push(
              formatTime(
                timestrToSec(accumulated[a][accumulated[a].length - 1]) +
                  timestrToSec(sortedHours[h][a])
              )
            );
          }
        }
        result[h][a] = accumulated[a][accumulated[a].length - 1];
      }
    }
  }

  return { hours: result, apps };
};

var sortObjectByKey = function (obj) {
  var keys = [];
  var sorted_obj = {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  // sort keys
  keys.sort();

  // create new array based on Sorted Keys
  keys.forEach((key) => {
    sorted_obj[key] = obj[key];
  });

  return sorted_obj;
};

export const sampleLineConfig = (labelName, fill = true) => {
  const { rgbaOpaque, rgbaNonOpaque } = getRandomRgb();

  return {
    label: labelName,
    fill: fill,
    lineTension: 0.1,
    backgroundColor: rgbaOpaque,
    borderColor: rgbaNonOpaque,
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointBorderColor: rgbaNonOpaque,
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: rgbaNonOpaque,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: [],
  };
};
