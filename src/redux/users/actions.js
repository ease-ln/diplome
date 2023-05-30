export const actionStrings = {
  USERS: "USERS",
};

export const actions = {
  fetchUsers: (payload) => ({
    type: actionStrings.USERS,
    payload,
  }),
};
