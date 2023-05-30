import { actions } from "./actions";
import { fetchPermissions } from "./../../services/RolesService";

export const actionCreator = {
  fetchPermissions: (token, email) => (dispatch) => {
    return fetchPermissions(token, email)
      .then((response) => {
        if (response.pages) {
          dispatch(actions.fetchPermissions(response));
          localStorage.setItem(
            "innometrics-permissions",
            JSON.stringify(response)
          );
          return response;
        } else {
          throw new Error("no pages key found in response");
        }
      })
      .catch((err) => false);
  },
};
