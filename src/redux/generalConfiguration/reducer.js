import { fromJS } from "immutable";
import { actionStrings as _ } from "./actions";

const initState = fromJS({
  companies: [],
  members: [],
  teams: [],
  agentsxcompanies: [],
  extprojxteams: [],
  company: {},
  member: {},
  team: {},
  extprojxteam: {},
  agentsxcompany: {}
});

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case _.PROJECTS:
      return setIfPayloadExists(state, "projects", action.payload.projectList);
    case _.COMPANIES:
      return setIfPayloadExists(state, "companies", action.payload.companyRequestList);
    case _.TEAMS:
      return setIfPayloadExists(state, "teams", action.payload.teamRequestList);
    case _.AGENTSXCOMPANIES:
      return setIfPayloadExists(state, "agentsxcompanies", action.payload.agentsCompanyList);
    case _.EXTPROJXTEAMS:
      return setIfPayloadExists(state, "extprojxteams", action.payload.externalProjectTeamList);
    case _.MEMBERS:
      return setIfPayloadExists(state, "members", action.payload.teammembersRequestList);
    case _.GET_COMPANY:
      return setIfPayloadExists(state, "company", action.payload);
    case _.GET_TEAM:
      return setIfPayloadExists(state, "team", action.payload.teamRequestList[0]);
    case _.GET_MEMBER:
      return setIfPayloadExists(state, "member", action.payload.teammembersRequestList[0]);
    case _.GET_AGENTSXCOMPANIES:
      return setIfPayloadExists(state, "agentsxcompany", action.payload);
    case _.GET_EXTPROJXTEAMS:
      return setIfPayloadExists(state, "extprojxteam", action.payload);
    default:
      return state;
  }
};

const setIfPayloadExists = (state, key, value) =>
  value ? state.set(key, value) : state;

