import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createRootReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { checkForSavedData } from "./utils";

const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
  createRootReducer(history),
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

checkForSavedData(store, history);

export { store, history };
