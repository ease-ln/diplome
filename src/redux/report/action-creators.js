import { actions } from './actions'
import {
  fetchActivityReport,
  fetchTimeReport,
  fetchSQMetrics,
  fetchCumulReport,
  fetchCategoryReport,
  deleteActivities,
} from '../../services/ReportService'
import { fetchActivities } from '../../services/ActivityService'
import { parseDate } from '../utils.js'
import { formatDate } from '../../views/Dashboard/DashboardHelper'

const lastFetchedKey = 'lastFetchedActivities'
const timeLocalStorageKey = 'timeReport'

export const actionCreator = {
  fetchActivityReport: (token, date, endDate, projectId) => (dispatch) => {
    const dateToFetch = date ? date : new Date()
    const endDateToFetch = endDate ? endDate : dateToFetch
    const formattedDate = formatDate(dateToFetch)
    const endDateToFetchFormatted = formatDate(endDateToFetch)

    return fetchActivityReport(
      token,
      formattedDate,
      endDateToFetchFormatted,
      projectId,
    )
      .then((response) => {
        if (response.report) {
          dispatch(actions.fetchActions(response))
          localStorage.setItem(
            'activityReport',
            JSON.stringify(response.report),
          )
          localStorage.setItem(lastFetchedKey, parseDate(new Date()))
          return response
        } else {
          throw new Error('no report key found in response')
        }
      })
      .catch((err) => false)
  },
  fetchTimeReport: (token, date, endDate, projectId) => (dispatch) => {
    const dateToFetch = date ? date : new Date()
    const endDateToFetch = endDate ? endDate : dateToFetch
    const formattedDate = formatDate(dateToFetch)
    const endDateToFetchFormatted = formatDate(endDateToFetch)

    return fetchTimeReport(
      token,
      formattedDate,
      endDateToFetchFormatted,
      projectId,
    )
      .then((response) => {
        if (response.report) {
          dispatch(actions.fetchTimeReport(response))
          localStorage.setItem(
            timeLocalStorageKey,
            JSON.stringify(response.report),
          )
          localStorage.setItem(lastFetchedKey, parseDate(new Date()))
          return response
        } else {
          throw new Error('no report key found in response')
        }
      })
      .catch((err) => false)
  },
  fetchCumulReport: (token, email, date, endDate, projectId) => (dispatch) => {
    const dateToFetch = date ? date : new Date()
    const endDateToFetch = endDate ? endDate : dateToFetch
    const formattedDate = formatDate(dateToFetch)
    const endDateToFetchFormatted = formatDate(endDateToFetch)

    return fetchCumulReport(
      token,
      email,
      formattedDate,
      endDateToFetchFormatted,
      projectId,
    ).then((response) => {
      if (response.activityReports) {
        sessionStorage.removeItem('cumulativeReport')
        sessionStorage.setItem(
          'cumulativeReport',
          JSON.stringify(response.activityReports),
        )
        dispatch(actions.fetchCumulReport(response, email))
        return response
      } else {
        throw new Error('no activityReports key found in response')
      }
    })
  },
  fetchCategoryReport: (token, date, endDate, projectId) => (dispatch) => {
    const dateToFetch = date ? date : new Date()
    const endDateToFetch = endDate ? endDate : dateToFetch
    const formattedDate = formatDate(dateToFetch)
    const endDateToFetchFormatted = formatDate(endDateToFetch)

    return fetchCategoryReport(
      token,
      formattedDate,
      endDateToFetchFormatted,
      projectId,
    ).then((response) => {
      if (response.report) {
        sessionStorage.removeItem('categoryReport')
        sessionStorage.setItem(
          'categoryReport',
          JSON.stringify(response.report),
        )
        dispatch(actions.fetchCategoryReport(response))
        return response
      } else {
        throw new Error('no report key found in response')
      }
    })
  },
  fetchActivitiesForDate: (token, date) => (dispatch) => {
    const dateToFetch = date ? date : new Date()
    const formattedDate = formatDate(dateToFetch)

    return fetchActivities(token, formattedDate).then((response) => {
      if (response.report) {
        dispatch(actions.fetchActivities(response))
        return response
      } else {
        throw new Error('no report key found in response')
      }
    })
  },
  deleteActivities: (token, ids) => (dispatch) => {
    return deleteActivities(token, ids).then((response) => {
      if ([204, 401, 403].includes(response.status)) {
        throw new Error('Unable to delete records, try again later.')
      }
    })
  },
  fetchNumOfClasses: (token, projectId, SQProjectId) => (dispatch) => {

    return fetchSQMetrics(
      token,
      projectId,
      SQProjectId
    )
      .then((response) => {
        if (response.reports) {
          dispatch(actions.fetchClasses(response))
          localStorage.setItem(
            timeLocalStorageKey,
            JSON.stringify(response.reports),
          )
          localStorage.setItem(lastFetchedKey, parseDate(new Date()))
          return response
        } else {
          throw new Error('no reports key found in response')
        }
      })
      .catch((err) => false)
  },
  fetchLOC: (token, projectId, SQProjectId) => (dispatch) => {

    return fetchSQMetrics(
      token,
      projectId,
      SQProjectId
    )
      .then((response) => {
        if (response.reports) {
          dispatch(actions.fetchClasses(response))
          localStorage.setItem(
            timeLocalStorageKey,
            JSON.stringify(response.reports),
          )
          localStorage.setItem(lastFetchedKey, parseDate(new Date()))
          return response
        } else {
          throw new Error('no reports key found in response')
        }
      })
      .catch((err) => false)
  },
  fetchCodeCoverage: (token, projectId, SQProjectId) => (dispatch) => {

    return fetchSQMetrics(
      token,
      projectId,
      SQProjectId
    )
      .then((response) => {
        if (response.reports) {
          dispatch(actions.fetchClasses(response))
          localStorage.setItem(
            timeLocalStorageKey,
            JSON.stringify(response.reports),
          )
          localStorage.setItem(lastFetchedKey, parseDate(new Date()))
          return response
        } else {
          throw new Error('no reports key found in response')
        }
      })
      .catch((err) => false)
  },
}
