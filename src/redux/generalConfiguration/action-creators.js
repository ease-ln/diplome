import { actions } from "./actions";
import {
  fetchCompanies,
  fetchAgentsxCompanies,
  fetchExtProjxTeams,
  fetchMembers,
  fetchTeams,
  getAgxComp,
  getCompany,
  getExtProjxTeam,
  getTeam,
  getMember,
  postAgxComp,
  postCompany,
  postExtProjxTeam,
  postMember,
  postTeam,
  putExtProjxTeam,
  putAgxComp,
  putCompany,
  putTeam,
  putMember,
  deleteMember,
  deleteAgxComp,
  deleteCompany,
  deleteExtProjxTeam,
  deleteTeam,
  fetchProjects
} from "../../services/ConfigurationService";


export const actionCreator = {
  fetchProjects: (token) => (dispatch) => {
    return fetchProjects(token)
      .then((response) => {
        dispatch(actions.fetchProjects(response));
        return response;
      })
      .catch((err) => false);
  },
  fetchCompanies: (token) => (dispatch) => {
    return fetchCompanies(token)
      .then((response) => {
        dispatch(actions.fetchCompanies(response));
        return response;
      })
      .catch((err) => false);
  },
  fetchTeams: (token, id) => (dispatch) => {
    return fetchTeams(token, id)
      .then((response) => {
        dispatch(actions.fetchTeams(response));
        return response;
      })
      .catch((err) => false);
  },
  fetchMembers: (token, id) => (dispatch) => {
    return fetchMembers(token, id)
      .then((response) => {
        dispatch(actions.fetchMembers(response));
        return response;
      })
      .catch((err) => false);
  },
  fetchAgentsxCompanies: (token, id) => (dispatch) => {
    return fetchAgentsxCompanies(token, id)
      .then((response) => {
        dispatch(actions.fetchAgentsxCompanies(response));
        return response;
      })
      .catch((err) => false);
  },
  fetchExtProjxTeams: (token, id) => (dispatch) => {
    return fetchExtProjxTeams(token, id)
      .then((response) => {
        dispatch(actions.fetchExtProjxTeams(response));
        return response;
      })
      .catch((err) => false);
  },
  getMember: (token, id) => (dispatch) => {
    return getMember(token, id)
      .then((response) => {
        dispatch(actions.getMember(response));
        return response;
      })
      .catch((err) => false);
  },
  postMember: (token, payload) => () => {
    return postMember(token, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  putMember: (token, id, payload) => () => {
    return putMember(token, id, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  deleteMember: (token, id) => () => {
    return deleteMember(token, id)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  getTeam: (token, id) => (dispatch) => {
    return getTeam(token, id)
      .then((response) => {
        dispatch(actions.getTeam(response));
        return response;
      })
      .catch((err) => false);
  },
  postTeam: (token, payload) => () => {
    return postTeam(token, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  putTeam: (token, id, payload) => () => {
    return putTeam(token, id, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  deleteTeam: (token, id) => () => {
    return deleteTeam(token, id)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  getExtProjxTeam: (token, id) => (dispatch) => {
    return getExtProjxTeam(token, id)
      .then((response) => {
        dispatch(actions.getExtProjxTeams(response));
        return response;
      })
      .catch((err) => false);
  },
  postExtProjxTeam: (token, payload) => () => {
    return postExtProjxTeam(token, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  putExtProjxTeam: (token, id, payload) => () => {
    return putExtProjxTeam(token, id, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  deleteExtProjxTeam: (token, id) => () => {
    return deleteExtProjxTeam(token, id)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  getCompany: (token, id) => (dispatch) => {
    return getCompany(token, id)
      .then((response) => {
        dispatch(actions.getCompany(response));
        return response;
      })
      .catch((err) => false);
  },
  postCompany: (token, payload) => () => {
    return postCompany(token, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  putCompany: (token, id, payload) => () => {
    return putCompany(token, id, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  deleteCompany: (token, id) => () => {
    return deleteCompany(token, id)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  getAgxComp: (token, id) => (dispatch) => {
    return getAgxComp(token, id)
      .then((response) => {
        dispatch(actions.getAgentsxCompanies(response));
        return response;
      })
      .catch((err) => false);
  },
  postAgxComp: (token, payload) => () => {
    return postAgxComp(token, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  putAgxComp: (token, id, payload) => () => {
    return putAgxComp(token, id, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  deleteAgxComp: (token, id) => () => {
    return deleteAgxComp(token, id)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
};
