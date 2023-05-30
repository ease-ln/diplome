export const actionStrings = {
  AGENTS: 'AGENTS',
  PROJECT_LIST: 'PROJECT_LIST',
  METHODS: 'METHODS',
  RESPONSES: 'RESPONSES',
  DETAILS: 'DETAILS',
  GET_AGENT: 'GET_AGENT',
  GET_METHOD: 'GET_METHOD',
  GET_DETAIL: 'GET_DETAIL',
  GET_RESPONSE: 'GET_RESPONSE'
}

export const actions = {
  fetchAgents: (payload) => ({
    type: actionStrings.AGENTS,
    payload,
  }),
  fetchProjectList: (payload) => ({
    type: actionStrings.PROJECT_LIST,
    payload,
  }),
  fetchDetails: (payload) => ({
    type: actionStrings.DETAILS,
    payload,
  }),
  fetchMethods: (payload) => ({
    type: actionStrings.METHODS,
    payload,
  }),
  fetchResponses: (payload) => ({
    type: actionStrings.RESPONSES,
    payload,
  }),
  getAgent: (payload)=>({
    type: actionStrings.GET_AGENT,
    payload,
  }),
  getMethod: (payload)=>({
    type: actionStrings.GET_METHOD,
    payload,
  }),
  getDetail: (payload)=>({
    type: actionStrings.GET_DETAIL,
    payload,
  }),
  getResponse: (payload)=>({
    type: actionStrings.GET_RESPONSE,
    payload,
  }),
}
