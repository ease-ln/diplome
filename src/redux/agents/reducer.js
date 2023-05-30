import { fromJS } from "immutable";
import { actionStrings as _ } from "./actions";

const initState = fromJS({
  agents: [],
  agent:{},
  agentProjectList: {},
  methods:[],
  method:{},
  responses:[],
  response:{},
  details:[],
  detail:{}
});

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case _.AGENTS:
      if (action.payload.agentList && action.payload.agentList.length > 0) {
        return state.set("agents", action.payload.agentList);
      } else {
        return state;
      }
    case _.METHODS:
      if (action.payload.methodsList) {
        return state.set("methods", action.payload.methodsList);
      } else {
        return state;
      }
    case _.DETAILS:
      if (action.payload.detailsList) {
        return state.set("details", action.payload.detailsList);
      } else {
        return state;
      }
    case _.RESPONSES:
      if (action.payload.responseList) {
        return state.set("responses", action.payload.responseList);
      } else {
        return state;
      }
    case _.PROJECT_LIST:
      if (action.payload.projectList && action.payload.projectList.length > 0) {
        return state.set("agentProjectList", {
          [action.payload.agentId]: action.payload.projectList,
        });
      } else {
        return state;
      }
    case _.GET_AGENT:
      if (action.payload) {
        return state.set("agent", action.payload);
      } else {
        return state;
      }
    case _.GET_METHOD:
      if (action.payload) {
        return state.set("method", action.payload);
      } else {
        return state;
      }
    case _.GET_RESPONSE:
      if (action.payload) {
        return state.set("response", action.payload);
      } else {
        return state;
      }
    case _.GET_DETAIL:
      if (action.payload) {
        return state.set("detail", action.payload);
      } else {
        return state;
      }
    default:
      return state;
  }
};
