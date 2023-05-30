export const PiePreprocesser = (data, userRole, email) => {
  if (!data || data.length === 0 || !data.report || data.report.length === 0)
    return;
  const isDev = userRole === "developer";

  const emailData = isDev
    ? data.report.filter((item) => item.email === email)
    : data.report;

  const TimeToSeconds = (time) => {
    const t = time.split(":");
    return t[0] * 3600 + t[1] * 60 + t[2] * 1;
  };

  let dataWODubl = [];
  emailData.sort((a, b) => (a.executable_name >= b.executable_name ? 1 : -1));

  for (let i = 0; i < emailData.length; i++) {
    if (i + 1 === emailData.length) break;

    if (emailData[i].executable_name === emailData[i + 1].executable_name) {
      dataWODubl.push({
        name: emailData[i].executable_name,
        time:
          TimeToSeconds(emailData[i].time_used) +
          TimeToSeconds(emailData[i + 1].time_used),
      });

      emailData.splice(i, 1);
    } else {
      dataWODubl.push({
        name: emailData[i].executable_name,
        time: TimeToSeconds(emailData[i].time_used),
      });
    }
  }
  dataWODubl.sort((a, b) => (a.time < b.time ? 1 : -1));
  if (dataWODubl.length > 6) {
    const sum = dataWODubl.slice(5).reduce((a, { time }) => a + time, 0);
    dataWODubl = dataWODubl.slice(0, 5);
    dataWODubl.push({ name: "Others", time: sum });
  }

  const series = dataWODubl.map((item) => item.time);

  const labels = dataWODubl.map((item) => {
    let tempDate = new Date(0);
    tempDate.setSeconds(item.time);
    let timeString = tempDate.toISOString().substr(11, 8);
    const ShortName =
      item.name.length > 10 ? item.name.slice(0, 10) + ".." : item.name;
    return ShortName + ": " + timeString;
  });

  return {
    series: series,
    labels: labels,
  };
};

//temp test data for pie

export const TestPieData = () => {
  let temp = Array.from(
    {
      length: 6,
    },
    () => Math.floor(Math.random() * 8400)
  );
  temp.sort((a, b) => (a < b ? 1 : -1));
  const getTime = (item) => {
    let tempDate = new Date(0);
    tempDate.setSeconds(item);
    let timeString = tempDate.toISOString().substr(11, 8);
    return ": " + timeString;
  };
  return {
    series: temp,
    labels: [
      `Safari: ${getTime(temp[0])}`,
      `VsCode: ${getTime(temp[1])}`,
      `Terminal: ${getTime(temp[2])}`,
      `Chrome: ${getTime(temp[3])}`,
      `Finder: ${getTime(temp[4])}`,
      `others: ${getTime(temp[5])}`,
    ],
  };
};
