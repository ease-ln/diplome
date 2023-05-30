import {
  timeChartData,
  activitiesChartData,
  thirdChartData,
  categoryChartData,
  numOfClasses,
  LOC,
  codeCoverage,
  //   fetchAgentsList,
  //   fetchSQProjectList,
} from "../../../redux/common/flows.js";

//create new card condig to add new widget
export const TimeSpent = {
  id: 0,
  name: "Accumulated Total Time Spent",
  type: "line",
  userSelectEnabled: true,
  withEndDate: true,
  defaultLayout: { lg: 3, md: 4 },
  api: (email, date, endDate, projectId, SQProjectId) =>
    timeChartData(date, endDate, projectId), //date, endDate, projectId
  backEndName: "Accumulated Total Time Spent",
};

export const Activities = {
  id: 1,
  name: "Accumulated Activities",
  type: "pie",
  userSelectEnabled: false,
  withEndDate: true,
  defaultLayout: { lg: 2, md: 2 },
  api: (email, date, endDate, projectId, SQProjectId) =>
    activitiesChartData(date, endDate, projectId), //date, endDate, projectId
  backEndName: "Accumulated Activities",
};

export const TopAps = {
  id: 2,
  name: "Top 5 Apps Per Person Daily",
  type: "line",
  userSelectEnabled: true,
  userSelectEmails: true,
  withEndDate: false,
  defaultLayout: { lg: 3, md: 4 },
  api: (email, date, endDate, projectId, SQProjectId) =>
    thirdChartData(email, date, endDate, projectId), //email, date, endDate, projectId
  backEndName: "Top 5 Apps per Day",
};
export const Category = {
  id: 3,
  name: "Category Chart",
  type: "bar",
  userSelectEnabled: false,
  withEndDate: true,
  api: (email, date, endDate, projectId, SQProjectId) =>
    categoryChartData(date, endDate, projectId), //date, endDate, projectId
  backEndName: "Category Chart",
};

export const SQClasses = {
  id: 4,
  name: "SonarQube Number of Classes",
  type: "number",
  userSelectEnabled: false,
  withEndDate: false,
  api: (email, date, endDate, projectId, SQProjectId) =>
    numOfClasses(projectId, SQProjectId), // projectId, SQProjectId
  backEndName: "SQ Number of Classes",
};

export const SQLoc = {
  id: 5,
  name: "SonarQube LOC",
  type: "number",
  userSelectEnabled: false,
  withEndDate: false,
  api: (email, date, endDate, projectId, SQProjectId) =>
    LOC(projectId, SQProjectId), //projectId, SQProjectId
  backEndName: "SQ Lines of Code",
};

export const SQCoverage = {
  id: 6,
  name: "SonarQube Code Coverage",
  type: "number",
  userSelectEnabled: false,
  withEndDate: false,
  api: (email, date, endDate, projectId, SQProjectId) =>
    codeCoverage(projectId, SQProjectId), //projectId, SQProjectId
  backEndName: "SQ Coverage",
};
