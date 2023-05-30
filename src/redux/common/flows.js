import { actionCreator as auth } from '../auth/action-creators'
import { actionCreator as report } from '../report/action-creators'
import { actionCreator as users } from '../users/action-creator.js'
import { actionCreator as projects } from '../projects/action-creators'
import { actionCreator as agents } from '../agents/action-creators'
import { actionCreator as roles } from '../roles/action-creator'

import { createUser } from '../../services/RolesService'
import { connectProject } from '../../services/AgentService'

import { localStorageKey } from '../utils.js'
import { loginUser, registerUser } from "../../services/AuthService";
import { changePassword, postData } from '../../services/UsersService'

export const fetchData = (token, email) => (dispatch) => {
  dispatch(users.fetchUsers(token))
  dispatch(report.fetchActivityReport(token))
  dispatch(report.fetchTimeReport(token))
  dispatch(report.fetchNumOfClasses(token))
  dispatch(report.fetchLOC(token))
  dispatch(report.fetchCumulReport(token, email, new Date()))
  dispatch(report.fetchCategoryReport(token, new Date()))
  dispatch(projects.fetchProjects(token, email))
  dispatch(roles.fetchPermissions(token, email))
}

export const loginFlow = (email, password) => (dispatch, getState) => {
  return dispatch(auth.login(email, password)).then((resp) => {
    localStorage.setItem('innometrics-email', JSON.stringify(email))
    if (resp) dispatch(fetchData(resp.token, email))
  })
}

export const thirdChartData = (email, date, endDate, projectId) => (
  dispatch,
  getState,
) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(
    report.fetchCumulReport(savedData.token, email, date, endDate, projectId),
  )
}

export const timeChartData = (date, endDate, projectId) => (
  dispatch,
  getState,
) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(
    report.fetchTimeReport(savedData.token, date, endDate, projectId),
  )
}

export const activitiesChartData = (date, endDate, projectId) => (
  dispatch,
  getState,
) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(
    report.fetchActivityReport(savedData.token, date, endDate, projectId),
  )
}

export const categoryChartData = (date, endDate, projectId) => (
  dispatch,
  getState,
) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(
    report.fetchCategoryReport(savedData.token, date, endDate, projectId),
  )
}

export const projectsData = (email) => (dispatch, getState) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(projects.fetchProjects(savedData.token, email))
}

export const numOfClasses = (projectId, SQProjectId) => (
  dispatch,
  getState,
) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(
    report.fetchNumOfClasses(savedData.token, projectId, SQProjectId),
  )
}

export const LOC = (projectId, SQProjectId) => (
  dispatch,
  getState,
) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(
    report.fetchLOC(savedData.token, projectId, SQProjectId),
  )
}

export const codeCoverage = (projectId, SQProjectId) => (
  dispatch,
  getState,
) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(
    report.fetchCodeCoverage(savedData.token, projectId, SQProjectId),
  )
}

export const logout = () => {
  localStorage.removeItem('innometrics-email')
  sessionStorage.removeItem('cumulativeReport')
  localStorage.removeItem('lastFetchedActivities')
  localStorage.removeItem('timeReport')
  localStorage.removeItem('numOfClasses')
  localStorage.removeItem('activitiesReport')
  localStorage.removeItem('users')
  localStorage.removeItem('projects')
  localStorage.removeItem('agents')
  localStorage.removeItem('innometrics-permissions')
  return auth.logout()
}

export const registerFlow = (firstName, surname, email, password) => {
  return new Promise((resolve, reject) => {
      resolve(registerUser(firstName, surname, email, password))
  })
}

export const postDataFlow = (data) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return postData(savedData.token, data)
}

export const changePasswordFlow = (password) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return changePassword(savedData.token, password)
}

export const oauthFlow = (agentId, projectId, cb) => (dispatch, getState) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(agents.beginOauth(savedData.token, agentId, projectId, cb))
}

export const refetchAgents = (projectId) => (dispatch, getState) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(agents.fetchAgents(savedData.token, projectId))
}

export const fetchProjectList = (agentId, projectId) => (
  dispatch,
  getState,
) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(agents.fetchProjectList(savedData.token, agentId, projectId))
}

export const fetchAgentsList = async (projectId) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  let data = await agents.fetchAgentsList(savedData.token, projectId)
  return data
}

export const fetchSQProjectList = async (projectId) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  let data = await agents.fetchSQProjectList(savedData.token, projectId)
  return data
}


export const fetchIndividualActivities = (date) => (dispatch, getState) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(report.fetchActivitiesForDate(savedData.token, date))
}

export const deleteActivities = (ids) => (dispatch, getState) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return dispatch(report.deleteActivities(savedData.token, ids))
}

export const createUserFlow = (email, name, alias) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return createUser(savedData.token, email, name, alias)
}

export const connectProjectFlow = (agentId, projectId, projectReference) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return connectProject(savedData.token, agentId, projectId, projectReference)
}

export const fetchSQMetrics = (projectIds) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return report.fetchSQMetrics(savedData.token, projectIds)
}

export const fetchSQCoverage = (projectId) => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey))
  return report.fetchSQCoverage(savedData.token, projectId)
}
