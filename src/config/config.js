export const entities = {
  USERS: {
    name: "USERS",
    reduxProp: "users"
  },
  USER: {
    name: "USER",
    reduxProp: "user"
  },
  AGENTS: {
    name: "AGENTS",
    reduxProp: "agents"
  },
  AGENT: {
    name: "AGENT",
    reduxProp: "agent"
  },
  DETAILS: {
    name: "DETAILS",
    reduxProp: "details"
  },
  DETAIL: {
    name: "DETAIL",
    reduxProp: "detail"
  },
  METHODS: {
    name: "METHODS",
    reduxProp: "methods"
  },
  METHOD: {
    name: "METHOD",
    reduxProp: "method"
  },
  RESPONSES: {
    name: "RESPONSES",
    reduxProp: "responses"
  },
  RESPONSE: {
    name: "RESPONSE",
    reduxProp: "response"
  },
  LOADING: {
    name: "LOADING",
    reduxProp: "loading"
  },
  ERROR: {
    name: "ERROR",
    reduxProp: "error"
  },
  COMPANIES: {
    name: "COMPANIES",
    reduxProp: "companies"
  },
  COMPANY: {
    name: "COMPANY",
    reduxProp: "company"
  },
  TEAMS: {
    name: "TEAMS",
    reduxProp: "companies"
  },
  TEAM: {
    name: "TEAM",
    reduxProp: "team"
  },
  MEMBER: {
    name: "MEMBER",
    reduxProp: "member"
  },
  MEMBERS: {
    name: "MEMBERS",
    reduxProp: "member"
  },
  EXTPROJXTEAM: {
    name: "EXTPROJXTEAM",
    reduxProp: "extprojxteam"
  },
  EXTPROJXTEAMS: {
    name: "EXTPROJXTEAMS",
    reduxProp: "extprojxteams"
  },
  AGENTSXCOMPANIES: {
    name: "AGENTSXCOMPANIES",
    reduxProp: "agentsxcompanies"
  },
  AGENTSXCOMPANY: {
    name: "AGENTSXCOMPANY",
    reduxProp: "agentsxcompany"
  }
};

export const appConfig = {
  localStorageItem: "innometric"
};

export const internalRoutePaths = {
  USERS: "/dashboard/profiles",
  USER: "/dashboard/profile/detail",
  USER_EDIT: "/dashboard/profile/edit",
  USER_REGISTER: "/dashboard/profiles/new",
  USER_DETAIL: "/dashboard/profile/detail/:id"
};
