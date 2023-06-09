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
  const { type, payload } = action;
  switch (type) {
    case _.AGENTS:
      return payload.agentList && payload.agentList.length > 0
        ? state.set("agents", payload.agentList)
        : state;
    case _.METHODS:
      return state.set("methods", payload.methodsList || state.get("methods"));
    case _.DETAILS:
      return state.set("details", payload.detailsList || state.get("details"));
    case _.RESPONSES:
      return state.set("responses", payload.responseList || state.get("responses"));
    case _.PROJECT_LIST:
      return payload.projectList && payload.projectList.length > 0
        ? state.set("agentProjectList", {
            [payload.agentId]: payload.projectList,
          })
        : state;
    case _.GET_AGENT:
      return payload ? state.set("agent", payload) : state;
    case _.GET_METHOD:
      return payload ? state.set("method", payload) : state;
    case _.GET_RESPONSE:
      return payload ? state.set("response", payload) : state;
    case _.GET_DETAIL:
      return payload ? state.set("detail", payload) : state;
    default:
      return state;
  }
};

