import {authGET} from './ApiService'

import {config} from './config'

const projectsRoute = (email) =>
  `${config.URL}:${config.PORT_NUMBER}/${config.API.VERSION}/Admin/Users/${
    config.API.PROJECTS
  }/${email.replace(/['"]+/g, '').trim()}`

export const fetchProjects = (token, email) => {
  return authGET(
    projectsRoute(email),
    config.CONTENT_TYPES.APPLICATION_JSON,
    token,
  )
}
