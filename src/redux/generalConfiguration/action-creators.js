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
  fetchProjects: (token) => async (dispatch) => {
    try {
      const response = await fetchProjects(token);
      dispatch(actions.fetchProjects(response));
      return response;
    } catch (err) {
      return false;
    }
  },
  fetchCompanies: (token) => async (dispatch) => {
    try {
      const response = await fetchCompanies(token);
      dispatch(actions.fetchCompanies(response));
      return response;
    } catch (err) {
      return false;
    }
  },
  fetchTeams: (token, id) => async (dispatch) => {
    try {
      const response = await fetchTeams(token, id);
      dispatch(actions.fetchTeams(response));
      return response;
    } catch (err) {
      return false;
    }
  },
  fetchMembers: (token, id) => async (dispatch) => {
    try {
      const response = await fetchMembers(token, id);
      dispatch(actions.fetchMembers(response));
      return response;
    } catch (err) {
      return false;
    }
  },
  fetchAgentsxCompanies: (token, id) => async (dispatch) => {
    try {
      const response = await fetchAgentsxCompanies(token, id);
      dispatch(actions.fetchAgentsxCompanies(response));
      return response;
    } catch (err) {
      return false;
    }
  },
  fetchExtProjxTeams: (token, id) => async (dispatch) => {
    try {
      const response = await fetchExtProjxTeams(token, id);
      dispatch(actions.fetchExtProjxTeams(response));
      return response;
    } catch (err) {
      return false;
    }
  },
  getMember: (token, id) => async (dispatch) => {
    try {
      const response = await getMember(token, id);
      dispatch(actions.getMember(response));
      return response;
    } catch (err) {
      return false;
    }
  },
  postMember: (token, payload) => async () => {
    try {
      const response = await postMember(token, payload);
      return response;
    } catch (err) {
      return false;
    }
  },
  putMember: (token, id, payload) => async () => {
    try {
      const response = await putMember(token, id, payload);
      return response;
    } catch (err) {
      return false;
    }
  },
  deleteMember: (token, id) => async () => {
    try {
      const response = await deleteMember(token, id);
      return response;
    } catch (err) {
      return false;
    }
  },
  getTeam: (token, id) => async (dispatch) => {
    try {
      const response = await getTeam(token, id);
      dispatch(actions.getTeam(response));
      return response;
    } catch (err) {
      return false;
    }
  },
  postTeam: (token, payload) => async () => {
    try {
      const response = await postTeam(token, payload);
      return response;
    } catch (err) {
      return false;
    }
  },
  putTeam: (token, id, payload) => async () => {
    try {
      const response = await putTeam(token, id, payload);
      return response;
    } catch (err) {
      return false;
    }
  },
  deleteTeam: (token, id) => async () => {
    try {
      const response = await deleteTeam(token, id);
      return response;
    } catch (err) {
      return false;
    }
  },
  getExtProjxTeam: (token, id) => async (dispatch) => {
    try {
      const response = await getExtProjxTeam(token, id);
      dispatch(actions.getExtProjxTeams(response));
      return response;
    } catch (err) {
      return false;
    }
  },
  postExtProjxTeam: (token, payload) => async () => {
    try {
      const response = await postExtProjxTeam(token, payload);
      return response;
    } catch (err) {
      return false;
    }
  },
  putExtProjxTeam: (token, id, payload) => async () => {
    try {
      const response = await putExtProjxTeam(token, id, payload);
      return response;
    } catch (err) {
      return false;
    }
  },
  deleteExtProjxTeam: (token, id) => async () => {
    try {
      const response = await deleteExtProjxTeam(token, id);
      return response;
    } catch (err) {
      return false;
    }
  },
  getCompany: (token, id) => async (dispatch) => {
    try {
      const response = await getCompany(token, id);
      dispatch(actions.getCompany(response));
      return response;
    } catch (err) {
      return false;
    }
  },
  postCompany: (token, payload) => async () => {
    try {
      const response = await postCompany(token, payload);
      return response;
    } catch (err) {
      return false;
    }
  },
  putCompany: (token, id, payload) => async () => {
    try {
      const response = await putCompany(token, id, payload);
      return response;
    } catch (err) {
      return false;
    }
  },
  deleteCompany: (token, id) => async () => {
    try {
      const response = await deleteCompany(token, id);
      return response;
    } catch (err) {
      return false;
    }
  },
  getAgxComp: (token, id) => async (dispatch) => {
    try {
      const response = await getAgxComp(token, id);
      dispatch(actions.getAgentsxCompanies(response));
      return response;
    } catch (err) {
      return false;
    }
  },
  postAgxComp: (token, payload) => async () => {
    try {
      const response = await postAgxComp(token, payload);
      return response;
    } catch (err) {
      return false;
    }
  },
  putAgxComp: (token, id, payload) => async () => {
    try {
      const response = await putAgxComp(token, id, payload);
      return response;
    } catch (err) {
      return false;
    }
  },
  deleteAgxComp: (token, id) => async () => {
    try {
      const response = await deleteAgxComp(token, id);
      return response;
    } catch (err) {
      return false;
    }
  },
};
