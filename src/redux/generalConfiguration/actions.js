export const actionStrings = {
  COMPANIES: 'COMPANIES',
  TEAMS: 'TEAMS',
  AGENTSXCOMPANIES: 'AGENTSXCOMPANIES',
  EXTPROJXTEAMS: 'EXTPROJXTEAMS',
  MEMBERS: 'MEMBERS',
  GET_MEMBER: 'GET_MEMBER',
  GET_TEAM: 'GET_TEAM',
  GET_AGENTSXCOMPANIES: 'GET_AGENTSXCOMPANIES',
  GET_EXTPROJXTEAMS: 'GET_EXTPROJXTEAMS',
  GET_COMPANY: 'GET_COMPANY',
  PROJECTS: 'PROJECTS'
}

export const actions = {
  fetchProjects: (payload) => ({
    type: actionStrings.PROJECTS,
    payload
  }),
  fetchCompanies: (payload) => ({
    type: actionStrings.COMPANIES,
    payload
  }),
  fetchAgentsxCompanies: (payload) => ({
    type: actionStrings.AGENTSXCOMPANIES,
    payload
  }),
  fetchExtProjxTeams: (payload) => ({
    type: actionStrings.EXTPROJXTEAMS,
    payload
  }),
  fetchMembers: (payload) => ({
    type: actionStrings.MEMBERS,
    payload
  }),
  fetchTeams: (payload) => ({
    type: actionStrings.TEAMS,
    payload
  }),
  getMember: (payload) => ({
    type: actionStrings.GET_MEMBER,
    payload
  }),
  getCompany: (payload) => ({
    type: actionStrings.GET_COMPANY,
    payload
  }),
  getAgentsxCompanies: (payload) => ({
    type: actionStrings.GET_AGENTSXCOMPANIES,
    payload
  }),
  getTeam: (payload) => ({
    type: actionStrings.GET_TEAM,
    payload
  }),
  getExtProjxTeams: (payload) => ({
    type: actionStrings.GET_EXTPROJXTEAMS,
    payload
  })
}
