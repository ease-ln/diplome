import { fromJS } from "immutable";
import { actionStrings as _ } from "./actions";

const initState = fromJS({
  users: [],
});

export const reducer = (state = initState, action) => {
  if (action.type === _.USERS) {
    if (action.payload.userList && action.payload.userList.length > 0) {
      return state.set("users", action.payload.userList);
    } else {
      return initState;
    }
  } else {
    return state;
  }
};