import { fromJS } from "immutable";
import { actionStrings as _ } from "./actions";

const initState = fromJS({
  loginSent: false,
  loggedIn: false,
  token: "",
  isLoading: false,
  error: null
});

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case _.LOGIN:
      return state;
    case _.LOGIN_START:
      return state.set("loginSent", true);
    case _.LOGIN_ERROR:
      return state.set("error", {
        error: action.payload.message,
        time: new Date()
      });
    case _.LOGIN_SUCCESS:
      return state.set("token", action.payload.token).set("loggedIn", true);
    case _.LOGOUT:
      return initState;
    default:
      return state;
  }
};
