export const actionStrings = {
  PERMISSIONS: 'PERMISSIONS',
}

export const actions = {
  fetchPermissions: (payload) => ({
    type: actionStrings.PERMISSIONS,
    payload,
  }),
}
