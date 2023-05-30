export const actionStrings = {
  PROJECTS: "PROJECTS",
};

export const actions = {
  fetchProjects: (payload) => ({
    type: actionStrings.PROJECTS,
    payload,
  }),
};
