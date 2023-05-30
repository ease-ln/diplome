import { appConfig } from "../config/config";
import { config } from "../services/config";

import { actions as authActions } from "./auth/actions";
import { actions as activityActions } from "./report/actions";
import { actions as usersActions } from "./users/actions.js";
import { actions as agentActions } from "./agents/actions";
import { actions as projectActions } from "./projects/actions";
import { actions as roleActions } from "./roles/actions";

import { actionCreator as report } from "./report/action-creators.js";
import { actionCreator as usersActionCreator } from "./users/action-creator.js";
import { actionCreator as project } from "./projects/action-creators";
import { actionCreator as role } from "./roles/action-creator";

import jwtDecode from "jwt-decode";

export const localStorageKey = `${config.URL}-${appConfig.localStorageItem}:${config.PORT_NUMBER}`;

export const saveData = (key, data) =>
  localStorage.setItem(localStorageKey, JSON.stringify(data));
export const getData = (key) => JSON.parse(localStorage.getItem(key));
export const removeData = (key) => localStorage.removeItem(key);

export function parseDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = String(date.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

export const checkForSavedData = (store, history) => {
  // fetch charts & user data
  const savedData = getData(localStorageKey);

  const activitiesData = localStorage.getItem("activityReport");
  const timeData = localStorage.getItem("timeReport");
  const cumulData = sessionStorage.getItem("cumulativeReport");
  const loggedInEmail = localStorage.getItem("innometrics-email");
  const users = localStorage.getItem("users");

  if (
    savedData &&
    savedData.token &&
    jwtDecode(savedData.token).exp < Date.now() / 1000
  ) {
    // token expired, relogin
    history.push("/login");
  } else if (
    savedData &&
    savedData.token &&
    loggedInEmail &&
    loggedInEmail.length > 0
  ) {
    store.dispatch(authActions.loginSuccess(savedData));

    // Bring activity chart data to redux store
    if (activitiesData) {
      const parsedActDate = JSON.parse(activitiesData);
      store.dispatch(activityActions.fetchActions({ report: parsedActDate }));
    } else {
      store.dispatch(report.fetchActivityReport(savedData.token));
    }

    // Bring cumulative chart data to redux store
    if (cumulData) {
      const parsedCumulData = JSON.parse(cumulData);
      store.dispatch(
        activityActions.fetchCumulReport({
          activityReports: parsedCumulData,
        })
      );
    } else {
      store.dispatch(report.fetchCumulReport(savedData.token, loggedInEmail));
    }

    // Bring time chart data to redux store
    if (timeData) {
      const parsedTime = JSON.parse(timeData);
      store.dispatch(activityActions.fetchTimeReport({ report: parsedTime }));
    } else {
      store.dispatch(report.fetchTimeReport(savedData.token));
    }

    // Bring users data to redux store
    if (users) {
      const parsedUsers = JSON.parse(users);
      store.dispatch(usersActions.fetchUsers({ userList: parsedUsers }));
    } else {
      store.dispatch(usersActionCreator.fetchUsers(saveData.token));
    }

    // Bring projects and agents to redux store
    const projects = localStorage.getItem("projects");
    const agents = localStorage.getItem("agents");

    if (projects && agents) {
      const parsedProjects = JSON.parse(projects);
      const parsedAgents = JSON.parse(agents);

      store.dispatch(
        projectActions.fetchProjects({ projectList: parsedProjects })
      );
      store.dispatch(agentActions.fetchAgents({ agentList: parsedAgents }));
    } else if (savedData && savedData.token) {
      store.dispatch(project.fetchProjects(savedData.token, loggedInEmail));
    }

    const permissions = localStorage.getItem("innometrics-permissions");
    if (permissions) {
      const parsedPermissions = JSON.parse(permissions);
      store.dispatch(roleActions.fetchPermissions(parsedPermissions));
    } else {
      store.dispatch(
        role.fetchPermissions(savedData.token, JSON.parse(loggedInEmail))
      );
    }
  }
};
