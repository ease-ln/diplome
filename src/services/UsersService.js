import { authGET, authPUT, authPOST } from "./ApiService";

import { config } from "./config";

const getUsersRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/Admin/${config.API.USERS}`;
const getUserRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/Admin/${config.API.REGISTER}`;
const getCurrentUserRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/Admin/${config.API.REGISTER}/nailyavaliull1409@gmail.com`;

export const fetchUsers = (token) => {
  return authGET(getUsersRoute, config.CONTENT_TYPES.APPLICATION_JSON, token);
};

export const postData = (token, data) => {
  return authPUT(getUserRoute, config.CONTENT_TYPES.APPLICATION_JSON, data, token);
}

export const changePassword = (token, password) => {
  return authPOST(getCurrentUserRoute, config.CONTENT_TYPES.APPLICATION_JSON, password, token);
}