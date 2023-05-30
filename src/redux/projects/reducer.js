import { fromJS } from "immutable";
import { actionStrings as _ } from "./actions";

const initState = fromJS({
  projects: [],
});

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case _.PROJECTS:
      if (action.payload.projectList && action.payload.projectList.length > 0) {
        return state.set("projects", action.payload.projectList);
      } else {
        return state;
      }
    default:
      return state;
  }
};
