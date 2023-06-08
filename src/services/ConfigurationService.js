import {authGET, authPOST, authPUT, authDELETE} from './ApiService'

import {config} from './config'

const CompaniesRoute = () =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.COMPANY}/${config.API.ALL}`

const TeamsRoute = (id) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.TEAM}/?companyId=${id}`

const MembersRoute = (id) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.TEAM_MEMBER}/?teamId=${id}`

const ExtProjxTeamsRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.EXTERNALPROJECTXTEAM}/team/${id}`

const AgentsxCompaniesRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.AGENTSXCOMPANY}/company/${id}`

const CompanyByIdRoute = (id) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.COMPANY}?id=${id}`

const CompanyUpdateById= (id) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.COMPANY}/${id}`

const CompanyRoute = () =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.COMPANY}`

const MemberByIdRoute = (id) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.TEAM_MEMBER}?memberId=${id}`

const PutMemberByIdRoute = (id) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.TEAM_MEMBER}/${id}`

const DeleteMemberByIdRoute = (id) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.TEAM_MEMBER}?id=${id}`

const MemberRoute = () =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.TEAM_MEMBER}`

const TeamByIdRoute = (id) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.TEAM}?teamId=${id}`

const PutTeamByIdRoute = (id) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.TEAM}/${id}`

const DeleteTeamByIdRoute = (id) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.TEAM}?id=${id}`

const TeamRoute = () =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.TEAM}`

const ExtProjxTeamByIdRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.EXTERNALPROJECTXTEAM}/config/${id}`

const putExtProjxTeamRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.EXTERNALPROJECTXTEAM}/${id}`

const postExtProjxTeamRoute = () =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.EXTERNALPROJECTXTEAM}`

const AgxCompByIdRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.AGENTSXCOMPANY}/config/${id}`

const putAgxCompRoute = (id) =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.AGENTSXCOMPANY}/${id}`

const postAgxCompRoute = () =>
  `${config.URL}:${config.OAUTH_PORT}/${config.API.AGENT_ADMIN}/${config.API.AGENTSXCOMPANY}`

const getProjectsRoute = () =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.AUTH_REST}/${config.API.GET_PROJECT}/${config.API.ALL}`

export const fetchProjects = (token) => {
  return authGET(
    getProjectsRoute(),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}

export const fetchCompanies = (token) => {
  return authGET(
    CompaniesRoute(),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
export const fetchTeams = (token, id) => {
  return authGET(
    TeamsRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
export const fetchMembers = (token, id) => {
  return authGET(
    MembersRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
export const fetchExtProjxTeams = (token, id) => {
  return authGET(
    ExtProjxTeamsRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
export const fetchAgentsxCompanies = (token, id) => {
  return authGET(
    AgentsxCompaniesRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
export const getCompany = (token, id) => {
  return authGET(
    CompanyByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
export const postCompany = (token, payload) => {
  return authPOST(
    CompanyRoute(),
    config.CONTENT_TYPES.APPLICATION_JSON,
    payload,
    token
  )
}
export const putCompany = (token, id, payload) => {
  return authPUT(
    CompanyUpdateById(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    payload,
    token
  )
}
export const deleteCompany = (token, id) => {
  return authDELETE(
    CompanyByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}
export const getMember = (token, id) => {
  return authGET(
    MemberByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
export const postMember = (token, payload) => {
  return authPOST(
    MemberRoute(),
    config.CONTENT_TYPES.APPLICATION_JSON,
    payload,
    token
  )
}
export const putMember = (token, id, payload) => {
  return authPUT(
    PutMemberByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    payload,
    token
  )
}
export const deleteMember = (token, id) => {
  return authDELETE(
    DeleteMemberByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}
export const getTeam = (token, id) => {
  return authGET(
    TeamByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
export const postTeam = (token, payload) => {
  return authPOST(
    TeamRoute(),
    config.CONTENT_TYPES.APPLICATION_JSON,
    payload,
    token
  )
}
export const putTeam = (token, id, payload) => {
  return authPUT(
    PutTeamByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    payload,
    token
  )
}
export const deleteTeam = (token, id) => {
  return authDELETE(
    DeleteTeamByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}
export const getExtProjxTeam = (token, id) => {
  return authGET(
    ExtProjxTeamByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
export const postExtProjxTeam = (token, payload) => {
  return authPOST(
    postExtProjxTeamRoute(),
    config.CONTENT_TYPES.APPLICATION_JSON,
    payload,
    token
  )
}
export const putExtProjxTeam = (token, id, payload) => {
  return authPUT(
    putExtProjxTeamRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    payload,
    token
  )
}
export const deleteExtProjxTeam = (token, id) => {
  return authDELETE(
    ExtProjxTeamByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}
export const getAgxComp = (token, id) => {
  return authGET(
    AgxCompByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
export const postAgxComp = (token, payload) => {
  return authPOST(
    postAgxCompRoute(),
    config.CONTENT_TYPES.APPLICATION_JSON,
    payload,
    token
  )
}
export const putAgxComp = (token, id, payload) => {
  return authPUT(
    putAgxCompRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    payload,
    token
  )
}
export const deleteAgxComp = (token, id) => {
  return authDELETE(
    AgxCompByIdRoute(id),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  )
}
