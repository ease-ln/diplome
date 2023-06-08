import { authGET, authPOST, authPUT, authDELETE, authReq } from './ApiService'

import { config } from './config'

const oauthStartRoute = (agentId, projectId, cb) => {
  return `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_GATEWAY}/me/${agentId}/${projectId}?cb=${cb}`
}

const agentListRoute = (projectId) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.AGENT}?ProjectId=${projectId}`

const projectListRoute = (agentId, projectId) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_GATEWAY}/projectList?AgentID=${agentId}&ProjectId=${projectId}`

const connectProjectRoute = `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_GATEWAY}/connectProject`

const agentWithIdRoute = (id) => `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.AGENT}/${id}`
const agentRoute = () => `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.AGENT}`

const getAgentMethodByAgentIdRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.METHOD}/agent/${id}`
const getAgentMethodByMethodIdRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.METHOD}/method/${id}`
const agentMethodRoute = () =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.METHOD}`
const agentMethodByIdRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.METHOD}/${id}`

const getAgentDetailByMethodIdRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.DETAILS}/method/${id}`
const getAgentDetailByDetailIdRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.DETAILS}/details/${id}`
const agentDetailRoute = () =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.DETAILS}`
const agentDetailByIdRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.DETAILS}/${id}`

const getAgentResponseByMethodIdRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.RESPONSE}/method/${id}`
const getAgentResponseByResponseIdRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.RESPONSE}/response/${id}`
const agentResponseRoute = () =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.RESPONSE}`
const agentResponseByIdRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.RESPONSE}/${id}`


export const beginOauth = (token, agentId, projectId, cb) => {
  window.open(oauthStartRoute(agentId, projectId, cb))
}

export const fetchAgents = (token, projectId) => {
  return authGET(
    agentListRoute(projectId),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}

export const fetchProjectList = (token, agentId, projectId) =>
  authGET(
    projectListRoute(agentId, projectId),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )

export const connectProject = (token, agentId, projectId, projectRef) => {
  return authReq(
    connectProjectRoute,
    config.REQ_TYPES.POST,
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
    {
      agentId,
      projectID: projectId,
      repoReference: projectRef,
    },
  )
}

export const fetchAgentMethods = (token, id) => {
  return authGET(
    getAgentMethodByAgentIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}

export const fetchAgentResponses = (token, id) => {
  return authGET(
    getAgentResponseByMethodIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}

export const fetchAgentDetails = (token, id) => {

  return authGET(
    getAgentDetailByMethodIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}

export const getAgent = (token, id) => {
  return authGET(
    agentWithIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}
export const postAgent = (token, data) => {
  return authPOST(
    agentRoute(),
    config.CONTENT_TYPES.APPLICATION_JSON,
    data,
    token
  )
}
export const putAgent = (token, id, data) => {
  return authPUT(
    agentWithIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    data,
    token
  )
}
export const deleteAgent = (token, id) => {
  return authDELETE(
    agentWithIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}

export const getMethod = (token, id) => {
  return authGET(
    getAgentMethodByMethodIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}
export const postMethod = (token, data) => {
  return authPOST(
    agentMethodRoute(),
    config.CONTENT_TYPES.APPLICATION_JSON,
    data,
    token
  )
}

export const putMethod = (token, id, data) => {
  return authPUT(
    agentMethodByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    data,
    token
  )
}
export const deleteMethod = (token, id) => {
  return authDELETE(
    getAgentMethodByMethodIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}
export const getDetail = (token, id) => {
  return authGET(
    getAgentDetailByDetailIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}
export const postDetail = (token, data) => {
  return authPOST(
    agentDetailRoute(),
    config.CONTENT_TYPES.APPLICATION_JSON,
    data,
    token
  )
}
export const putDetail = (token, id, data) => {
  return authPUT(
    agentDetailByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    data,
    token
  )
}
export const deleteDetail = (token, id) => {
  return authDELETE(
    getAgentDetailByDetailIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}
export const getResponse = (token, id) => {
  return authGET(
    getAgentResponseByResponseIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}
export const postResponse = (token, data) => {
  return authPOST(
    agentResponseRoute(),
    config.CONTENT_TYPES.APPLICATION_JSON,
    data,
    token
  )
}
export const putResponse = (token, id, data) => {
  return authPUT(
    agentResponseByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    data,
    token
  )
}
export const deleteResponse = (token, id) => {
  return authDELETE(
    getAgentResponseByResponseIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}

export const fetchAgentsList = (token, projectId) => {
  return authGET(
    `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.AGENT}?ProjectId=${projectId}`,
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}

export const fetchSQProjectList = (token, projectId) => {
  return authGET(
    `https://innometric.guru:9090/AgentGateway/projectList?AgentID=5&ProjectId=${projectId}`,
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
