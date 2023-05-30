import { actions } from "./actions";
import { loginUser } from "./../../services/AuthService";
import { saveData, localStorageKey, removeData } from "../utils";

export const actionCreator = {
  login: (email, password) => dispatch => {
    dispatch(actions.loginStart());
    return loginUser(email, password)
      .then(response => {
        dispatch(actions.loginSuccess(response));
        saveData(localStorageKey, response);
        return response;
      })
      .catch(error => {
        dispatch(actions.loginError(error));
        return false;
      });
  },
  logout: () => dispatch => {
    dispatch(actions.logout());
    removeData(localStorageKey);
    return true;
  }
};
