import { actions } from "./actions";
import { fetchUsers } from "./../../services/UsersService";

export const actionCreator = {
  fetchUsers: (token) => (dispatch) => {
    return fetchUsers(token)
      .then((response) => {
        if (response.userList) {
          dispatch(actions.fetchUsers(response));
          localStorage.setItem("users", JSON.stringify(response.userList));
          return response;
        } else {
          throw new Error("No userList key found in response");
        }
      })
      .catch((_) => false);
  },
};
