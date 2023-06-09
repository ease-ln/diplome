import { fromJS } from "immutable";
import { actionStrings as _ } from "./actions";

const initState = fromJS({
  pages: [],
  role: null,
});

export const reducer = (state = initState, action) => {
  if (action.type === _.PERMISSIONS) {
    if (action.payload.pages && action.payload.pages.length > 0) {
      return state
        .set("pages", action.payload.pages)
        .set("role", action.payload.role);
    } else {
      return state;
    }
  } else {
    return state;
  }
};
