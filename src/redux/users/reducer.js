import { fromJS } from "immutable";
import { actionStrings as _ } from "./actions";

const initState = fromJS({
  users: [],
});

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case _.USERS:
      if (action.payload.userList && action.payload.userList.length > 0) {
        return state.set("users", action.payload.userList);
      } else {
        return initState;
      }
    default:
      return state;
  }
};
