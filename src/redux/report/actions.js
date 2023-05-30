export const actionStrings = {
  ACTIVITY: "ACTIVITY",
  ACTIVITIES: "ACTIVITIES",
  CUMUL: "CUMUL",
  CLASSES: "CLASSES",
  CATEGORY: "CATEGORY",
  TIME: "TIME",
};

export const actions = {
  fetchActions: (payload) => ({
    type: actionStrings.ACTIVITY,
    payload,
  }),
  fetchTimeReport: (payload) => ({
    type: actionStrings.TIME,
    payload,
  }),
  fetchCumulReport: (payload) => ({
    type: actionStrings.CUMUL,
    payload,
  }),
  fetchCategoryReport: (payload) => ({
    type: actionStrings.CATEGORY,
    payload,
  }),
  fetchActivities: (payload) => ({
    type: actionStrings.ACTIVITIES,
    payload,
  }),
  fetchClasses: (payload) => ({
    type: actionStrings.CLASSES,
    payload,
  }),
};
