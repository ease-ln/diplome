import { authGET } from "./ApiService";

import { config } from "./config";

const activitiesRoute = (date) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/${config.API.ACTIVITY}?reportDate=${date}`;

export const fetchActivities = (token, date) => {
  return authGET(
    activitiesRoute(date),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token
  );
};
