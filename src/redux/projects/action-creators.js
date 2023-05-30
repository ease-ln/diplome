import {actions} from './actions'
import {fetchProjects} from '../../services/ProjectsService'
import {actionCreator as agents} from '../agents/action-creators'

const projectsKey = 'projects'

export const actionCreator = {
  fetchProjects: (token, email) => (dispatch) => {
    return fetchProjects(token, email)
      .then((response) => {
        if (response.projectList) {
          dispatch(actions.fetchProjects(response))
          localStorage.setItem(
            projectsKey,
            JSON.stringify(response.projectList),
          )

          // Fetch all agents for project
          const projectId = response.projectList[0].projectID
          dispatch(agents.fetchAgents(token, projectId))
          return response
        } else {
          throw new Error('no projectList key found in response')
        }
      })
      .catch((err) => false)
  },
}
