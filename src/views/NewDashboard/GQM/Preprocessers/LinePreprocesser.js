export const LinePreprocesserTime = (data, initStartDate, initEndDate) => {
  if (!data || !data.report || data.report.length === 0) return null;
  let allEmails = [];

  data.report.forEach((dataObj) => {
    if (!allEmails.find((e) => e === dataObj.email))
      allEmails.push(dataObj.email);
  });

  let dataByEmail = [];
  allEmails.forEach((em) => {
    dataByEmail.push({
      name: em,
      data: data.report.filter((d) => d.email === em),
    });
  });

  const days =
    (getDateWithoutTime(initEndDate).getTime() -
      getDateWithoutTime(initStartDate).getTime()) /
    (1000 * 3600 * 24);
  const allMembersTime = Array(days).fill(0);
  const allDates = [];

  dataByEmail = dataByEmail.map((EmailData) => {
    const startDate = new Date(initStartDate).getTime();
    let date = new Date(initEndDate);

    let DataForAllDates = [];
    let k = EmailData.data.length - 1;
    let daysIndex = days - 1;

    while (startDate !== date.getTime()) {
      if (allDates.length !== days) allDates.push(date.getTime());
      date.setDate(date.getDate() - 1);

      if (
        k !== -1 &&
        getDateWithoutTime(
          EmailData.data[k].activity_day.split("/").reverse().join("-")
        ).getTime() === getDateWithoutTime(date).getTime()
      ) {
        const time = TimeToSeconds(EmailData.data[k].time_used);
        DataForAllDates.push(time);
        allMembersTime[daysIndex] += time;
        k--;
      } else DataForAllDates.push(0);
      daysIndex--;
    }
    return {
      name: EmailData.name,
      data: DataForAllDates.reverse(),
    };
  });

  dataByEmail.unshift({
    name: "Accumulated data",
    data: allMembersTime,
  });

  return {
    series: dataByEmail,
    dates: allDates.reverse(),
  };
};

//helper functions for line App

export function formatTime(seconds) {
  return [
    pad(Math.floor(seconds / 3600)),
    pad(Math.floor(seconds / 60) % 60),
    pad(seconds % 60),
  ].join(":");
}

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
var sortObjectByKey = function (obj) {
  var keys = [];
  var sorted_obj = {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  // sort keys
  keys.sort(function(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  
  // create new array based on Sorted Keys
  keys.forEach((key) => {
    sorted_obj[key] = obj[key];
  });

  return sorted_obj;
};
const getDateWithoutTime = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const newDate = new Date(year, month, day);
  return newDate;
};

const TimeToSeconds = (time) => {
  const t = time.split(":");
  return t[0] * 3600 + t[1] * 60 + t[2] * 1;
};

//main functions for line App
export const LinePreprocesserApps = (data) => {
  if (!data || !data.activityReports || data.activityReports.length === 0)
    return null;

  return cumulteHourly(data.activityReports);
};

const cumulteHourly = (reportList) => {
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
  let i = -1;
  let prevKey = -1;
  let res = [];
  for (const [key, value] of Object.entries(sortedHours)) {
    i++;
    if (i === 0) {
      res.push({ hour: parseInt(key), data: value });
      prevKey = key;
      continue;
    }
    if (parseInt(prevKey) === parseInt(key) - 1) {
      res.push({ hour: parseInt(key), data: value });
      prevKey = key;
      continue;
    }
    while (parseInt(prevKey) !== parseInt(key) - 1) {
      res.push({ hour: parseInt(prevKey) + 1, value: undefined });
      prevKey = parseInt(prevKey) + 1 + "";
    }
    res.push({ hour: parseInt(key), data: value });
    prevKey = key;
  }
  const accumulated = {};
  apps.forEach((a) => {
    accumulated[a] = [];
  });

  const pureHours = res.map((a) => a.hour);

  let series = apps.map((a) => {
    return { name: a, data: [] };
  });
  series = series.map((item) => {
    const t = res.map((a) =>
      a.data ? (a.data[item.name] ? TimeToSeconds(a.data[item.name]) : 0) : 0
    );
    return {
      name: item.name,
      data: t,
    };
  });

  //   const result = {};

  return {
    series: series,
    dates: pureHours,
  };
};
// _________________________________________________________
// //temp test data
// const testDates = () => {
// 	let date = new Date('01-04-2022')
// 	let dates = []
// 	for (let i = 0; i < 30; i++){
// 		dates.push(date.getTime())
// 		date.setDate(date.getDate() + 1)
// 	}
// 	return dates
// }
// const testSeries = () => {
// 	return [
// 		{
// 			name: "Accumulated data",
// 			data: Array.from({
// 					length: 30
// 				}, () => Math.floor(Math.random() * 14400))
// 		},
// 		{
// 			name: "x.vasquez",
// 			data: Array.from({
// 					length: 30
// 				}, () => Math.floor(Math.random() * 14400))
// 		},
// 		{
// 			name: "i.ishbaev@innopolis.university",
// 			data: Array.from({
// 					length: 30
// 				}, () => Math.floor(Math.random() * 14400))
// 		},
// 		{
// 			name: "i.ivanov@innopolis.university",
// 			data: Array.from({
// 					length: 30
// 				}, () => Math.floor(Math.random() * 14400))
// 		},
// 		{
// 			name: "a.sidorov@innopolis.university",
// 			data: Array.from({
// 					length: 30
// 				}, () => Math.floor(Math.random() * 14400))
// 		}
// 	]
// }
// export const TestLineData = () => {
// 	return {
// 		series: testSeries(),
// 		dates: testDates()
// 	}
// }

// export const TestLineApps = () => {

// 	let idel = {
// 		name: 'i.ishbaev@innopolis.university',
// 		data: [
// 			{
// 				name: "Safari",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 8000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "VsCode",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 8000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "Terminal",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 8000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "Chrome",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 8000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "Finder",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 8000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 		]
// 	}
// 	let ivan = {
// 		name: 'i.ivanov@innopolis.university',
// 		data: [
// 			{
// 				name: "Safari",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 8000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "VsCode",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 8000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "Terminal",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 8000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "Chrome",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 8000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "Finder",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 8000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 		]
// 	}
// 	let Accumulated = {
// 		name: 'accumulated',
// 		data: [
// 			{
// 				name: "Safari",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 3000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "VsCode",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 3000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "Terminal",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 3000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "Chrome",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 3000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 			{
// 				name: "Finder",
// 				data: Array.from({
// 					length: 4
// 				}, () => Math.floor(Math.random() * 3000)).sort((a, b) => a > b ? 1 : -1)
// 			},
// 		]
// 	}

// 	return {
// 		series: [Accumulated, idel, ivan],
// 		dates: [12, 13, 14, 15]
// 	}
// }

// export const TestLineApps = () => {
//   return;
// };

// const emailN = {
//   name: "email",
//   data: [
//     {
//       name: "AppName",
//       data: [], //length X
//     },
//   ],
// };
// const result = {
// 	series: [emailN, null, null],
// 	dates: [1,2,3] //length X
// }
