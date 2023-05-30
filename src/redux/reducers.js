import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { reducer as userReducer } from "./user/reducer";
import { reducer as authReducer } from "./auth/reducer";
import { reducer as activityReducer } from "./report/reducer";
import { reducer as usersReducer } from "./users/reducer";
import { reducer as projectsReducer } from "./projects/reducer";
import { reducer as agentsReducer } from "./agents/reducer";
import { reducer as rolesReducer } from "./roles/reducer";
import {reducer as configurationReducer} from "./generalConfiguration/reducer"

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    auth: authReducer,
    report: activityReducer,
    users: usersReducer,
    projects: projectsReducer,
    agents: agentsReducer,
    roles: rolesReducer,
    configuration: configurationReducer
  });
