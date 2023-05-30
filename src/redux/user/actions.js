export const actionStrings = {
  LOGIN: "LOGIN",
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",

  LOGOUT: "LOGOUT"
};

export const actions = {
  login: (email, password) => ({
    type: actionStrings.LOGIN,
    payload: { email, password }
  }),
  loginStart: () => ({
    type: actionStrings.LOGIN_START
  }),
  loginSuccess: data => ({
    type: actionStrings.LOGIN_SUCCESS,
    payload: data
  }),
  loginError: error => ({
    type: actionStrings.LOGIN_ERROR,
    payload: error
  }),
  logout: () => ({
    type: actionStrings.LOGOUT
  })
};
