import { authGET, authReqWithoutJSON } from './ApiService'

import { config } from './config'

const activitiyRoute = (date, endDate, projectId) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/${config.API.REPORTS
  }/${config.API.ACTIVITIES_REPORT}?min_Date=${date}&max_Date=${endDate}${projectId ? '&projectID=' + projectId : ''
  }`

const timeRoute = (date, endDate, projectId) => {
  return `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/${config.API.REPORTS
    }/${config.API.TIME_REPORT}?min_Date=${date}&max_Date=${endDate}${projectId ? '&projectID=' + projectId : ''
    }`
}

const cumulRoute = (email, date, endDate, projectId) => {
  const escapedEmail = email.replace(/['"]+/g, '').trim()
  return `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/${config.API.REPORTS
    }/${config.API.CUMUL_REPORT
    }?email=${escapedEmail}&min_Date=${date}&max_Date=${endDate}${projectId ? '&projectID=' + projectId : ''
    }`
}

const categoryRoute = (date, endDate, projectId) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/${config.API.REPORTS
  }/${config.API.CATEGORY_REPORT}?min_Date=${date}&max_Date=${endDate}${projectId ? '&projectID=' + projectId : ''
  }`

const deleteActivitiesRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/${config.API.ACTIVITY}`

const SonarQubeMetricsRoute = (projectId, SQProjectId) => {
  return `${config.URL}:${config.OAUTH_PORT}/metric/history?InnoProjectId=${projectId}&SonarProjectId=${SQProjectId}`
}

export const fetchActivityReport = (token, date, endDate, projectId) => {
  return authGET(
    activitiyRoute(date, endDate, projectId),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}

export const fetchTimeReport = (token, date, endDate, projectId) => {
  return authGET(
    timeRoute(date, endDate, projectId),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}

export const fetchCumulReport = (token, email, date, endDate, projectId) => {
  return authGET(
    cumulRoute(email, date, endDate, projectId),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}

export const fetchCategoryReport = (token, date, endDate, projectId) => {
  return authGET(
    categoryRoute(date, endDate, projectId),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}

export const deleteActivities = (token, ids) => {
  return authReqWithoutJSON(
    deleteActivitiesRoute,
    config.REQ_TYPES.DELETE,
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
    { ids: ids.map((x) => x) },
  )
}

export const fetchSQMetrics = (token, projectId, SQProjectId) => {
  return authGET(
    SonarQubeMetricsRoute(projectId, SQProjectId),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
