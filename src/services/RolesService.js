import {authGET, authPOST} from './ApiService'

import {config} from './config'

const permissionsForUserRoute = (email) => {
  return `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/${config.API.PERMISSION_FOR_USER}/${email}`
}

const createUserRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/Admin/User`

export const fetchPermissions = (token, email) => {
  return authGET(
    permissionsForUserRoute(email),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}

export const createUser = (token, email, name, alias) => {
  return authPOST(
    createUserRoute,
    config.CONTENT_TYPES.APPLICATION_JSON,
    {
      email,
      name,
      password: 'Innopolis#2021',
      telegram_alias: alias,
      isactive: 'Y',
      birthday: 'n/a',
      facebook_alias: 'n/a',
      gender: 'n/a',
      linkedin_alias: 'n/a',
      twitter_alias: 'n/a',
      role: 'DEVELOPER',
      surname: 'n/a',
    },
    token,
  )
}
