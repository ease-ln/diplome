import { actions } from "./actions";
import { loginUser, registerUser } from "../../services/AuthService";
import { saveData, localStorageKey, removeData } from "../utils";

export const actionCreator = {
  login: (email, password) => (dispatch) => {
    dispatch(actions.loginStart());
    return loginUser(email, password)
      .then((response) => {
        if (response.token) {
          dispatch(actions.loginSuccess(response));
          saveData(localStorageKey, response);
          localStorage.setItem("email", email);
          return response;
        } else {
          dispatch(actions.loginError(response.message));
          return false;
        }
      })
      .catch((error) => {
        dispatch(actions.loginError(error));
        return false;
      });
  },
  logout: () => (dispatch) => {
    dispatch(actions.logout());
    removeData(localStorageKey);
    removeData("activityReport");
  },
  register: (firstName, surname, email, password) => (dispatch) => {
    return registerUser(firstName, surname, email, password)
      .then((response) => {
        dispatch(actions.register());
        return response;
      })
      .catch((e) => {
        dispatch(actions.registerError(e.message));
      });
  },
};
