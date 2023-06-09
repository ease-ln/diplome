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
      return setIfPayloadExists(state, "agents", payload.agentList);
    case _.METHODS:
      return setIfPayloadExists(state, "methods", payload.methodsList);
    case _.DETAILS:
      return setIfPayloadExists(state, "details", payload.detailsList);
    case _.RESPONSES:
      return setIfPayloadExists(state, "responses", payload.responseList);
    case _.PROJECT_LIST:
      return setIfPayloadExists(state, "agentProjectList", {
        [payload.agentId]: payload.projectList,
      });
    case _.GET_AGENT:
      return setIfPayloadExists(state, "agent", payload);
    case _.GET_METHOD:
      return setIfPayloadExists(state, "method", payload);
    case _.GET_RESPONSE:
      return setIfPayloadExists(state, "response", payload);
    case _.GET_DETAIL:
      return setIfPayloadExists(state, "detail", payload);
    default:
      return state;
  }
};

const setIfPayloadExists = (state, key, value) =>
  value ? state.set(key, value) : state;
