import { fromJS } from "immutable";
import { actionStrings as _ } from "./actions";
import { parseDate } from "../utils.js";

const initState = fromJS({
  lastFetched: null,
  activities: [],
  time: [],
  cumul: [],
  individualActivities: [],
});

const updateState = (state, action, property) => {
  if (action.payload.report && action.payload.report.length > 0) {
    return state.set("lastFetched", parseDate(new Date())).set(property, action.payload.report);
  } else {
    return state;
  }
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case _.ACTIVITY:
      return updateState(state, action, "activities");
    case _.TIME:
      return updateState(state, action, "time");
    case _.CUMUL:
      return updateState(state, action, "cumul");
    case _.CATEGORY:
      return updateState(state, action, "category");
    case _.ACTIVITIES:
      return state.set("individualActivities", action.payload.report || []);
    default:
      return state;
  }
};

