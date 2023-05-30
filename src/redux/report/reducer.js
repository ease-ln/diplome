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

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case _.ACTIVITY:
      if (action.payload.report && action.payload.report.length > 0) {
        return state
          .set("lastFetched", parseDate(new Date()))
          .set("activities", action.payload.report);
      } else {
        return state;
      }
    case _.TIME:
      if (action.payload.report && action.payload.report.length > 0) {
        return state
          .set("lastFetched", parseDate(new Date()))
          .set("time", action.payload.report);
      } else {
        return state;
      }
    case _.CUMUL:
      if (
        action.payload.activityReports &&
        action.payload.activityReports.length > 0
      ) {
        return state
          .set("lastFetched", parseDate(new Date()))
          .set("cumul", action.payload.activityReports);
      } else {
        return state;
      }
    case _.CATEGORY:
      if (action.payload.report && action.payload.report.length > 0) {
        return state.set("category", action.payload.report);
      } else {
        return state;
      }
    default:
      return state;
    case _.ACTIVITIES:
      if (action.payload.report && action.payload.report.length > 0) {
        return state.set("individualActivities", action.payload.report);
      } else {
        return state;
      }
  }
};
