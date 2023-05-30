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
      if (action.payload.projectList) {
        return state.set("projects", action.payload.projectList);
      } else {
        return state;
      }
    case _.COMPANIES:
      if (action.payload.companyRequestList) {
        return state.set("companies", action.payload.companyRequestList);
      } else {
        return state;
      }
    case _.TEAMS:
      if (action.payload.teamRequestList) {
        return state.set("teams", action.payload.teamRequestList);
      } else {
        return state;
      }
    case _.AGENTSXCOMPANIES:
      if (action.payload.agentsCompanyList) {
        return state.set("agentsxcompanies", action.payload.agentsCompanyList);
      } else {
        return state;
      }
    case _.EXTPROJXTEAMS:
      if (action.payload.externalProjectTeamList) {
        return state.set("extprojxteams", action.payload.externalProjectTeamList);
      } else {
        return state;
      }
    case _.MEMBERS:
      if (action.payload.teammembersRequestList) {
        return state.set("members", action.payload.teammembersRequestList);
      } else {
        return state;
      }
    case _.GET_COMPANY:
      if (action.payload) {
        return state.set("company", action.payload);
      } else {
        return state;
      }
    case _.GET_TEAM:
      if (action.payload.teamRequestList[0]) {
        return state.set("team", action.payload.teamRequestList[0]);
      } else {
        return state;
      }
    case _.GET_MEMBER:
      if (action.payload.teammembersRequestList[0]) {
        return state.set("member", action.payload.teammembersRequestList[0]);
      } else {
        return state;
      }
    case _.GET_AGENTSXCOMPANIES:
      if (action.payload) {
        return state.set("agentsxcompany", action.payload);
      } else {
        return state;
      }
    case _.GET_EXTPROJXTEAMS:
      if (action.payload) {
        return state.set("extprojxteam", action.payload);
      } else {
        return state;
      }
    default:
      return state;
  }
};
