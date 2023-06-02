import { actions } from "./actions";
import {
  fetchAgents,
  beginOauth,
  fetchProjectList,
  fetchAgentsList,
  fetchSQProjectList,
  fetchAgentMethods,
  fetchAgentDetails,
  fetchAgentResponses,
  getAgent,
  postAgent,
  putAgent,
  deleteAgent,
  getMethod,
  postMethod,
  putMethod,
  deleteMethod,
  getResponse,
  postResponse,
  putResponse,
  deleteResponse,
  getDetail,
  postDetail,
  putDetail,
  deleteDetail
} from "../../services/AgentService";

const agentsKey = "agents";
const agentProjectsKey = (agentId) => `agent-${agentId}-projectList`;

export const actionCreator = {
  fetchAgents: (token, projectId) => async (dispatch) => {
    return fetchAgents(token, projectId)
      .then((response) => {
        if (response.agentList) {
          dispatch(actions.fetchAgents(response));
          localStorage.setItem(agentsKey, JSON.stringify(response.agentList));
          return response;
        } else {
          throw new Error("no agentList key found in response");
        }
      })
      .catch((err) => false);
  },
  getAgent: (token, id) => async (dispatch) => {
    return getAgent(token, id)
      .then((response) => {
        dispatch(actions.getAgent(response));
        return response;
      })
      .catch((err) => false);
  },
  postAgent: (token, data) => async () => {
    return postAgent(token, data)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  putAgent: (token, id, data) => async () => {
    return putAgent(token, id, data)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  deleteAgent: (token, id) => async () => {
    return deleteAgent(token, id)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  getMethod: (token, id) => async (dispatch) => {
    return getMethod(token, id)
      .then((response) => {
        dispatch(actions.getMethod(response));
        return response;
      })
      .catch((err) => false);
  },
  postMethod: (token, data) => async () => {
    return postMethod(token, data)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  putMethod: (token, id, data) => async () => {
    return putMethod(token, id, data)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  deleteMethod: (token, id) => async () => {
    return deleteMethod(token, id)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  getDetail: (token, id) => async (dispatch) => {
    return getDetail(token, id)
      .then((response) => {
        dispatch(actions.getDetail(response));
        return response;
      })
      .catch((err) => false);
  },
  postDetail: (token, data) => async () => {
    return postDetail(token, data)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  putDetail: (token, id, data) => async () => {
    return putDetail(token, id, data)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  deleteDetail: (token, id) => async () => {
    return deleteDetail(token, id)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  getResponse: (token, id) => async (dispatch) => {
    return getResponse(token, id)
      .then((response) => {
        dispatch(actions.getResponse(response));
        return response;
      })
      .catch((err) => false);
  },
  postResponse: (token, data) => async () => {
    return postResponse(token, data)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  putResponse: (token, id, data) => async () => {
    return putResponse(token, id, data)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  deleteResponse: (token, id) => async () => {
    return deleteResponse(token, id)
      .then((response) => {
        return response;
      })
      .catch((err) => false);
  },
  fetchAgentMethods: (token, id) => async (dispatch) => {
    return fetchAgentMethods(token, id)
      .then((response) => {
        dispatch(actions.fetchMethods(response));
        return response;
      })
      .catch((err) => false);
  },
  fetchAgentDetails: (token, id) => async (dispatch) => {
    return fetchAgentDetails(token, id)
      .then((response) => {
        dispatch(actions.fetchDetails(response));
        return response;
      })
      .catch((err) => false);
  },
  fetchAgentResponses: (token, id) => async (dispatch) => {
    return fetchAgentResponses(token, id)
      .then((response) => {
        dispatch(actions.fetchResponses(response));
        return response;
      })
      .catch((err) => false);
  },
  beginOauth: (token, agentId, projectId, cb) => (dispatch) => {
    return beginOauth(token, agentId, projectId, cb);
  },
  fetchProjectList: (token, agentId, projectId) => async (dispatch) => {
    return fetchProjectList(token, agentId, projectId)
      .then((response) => {
        if (response.projectList) {
          dispatch(actions.fetchProjectList(response));
          localStorage.setItem(
            agentProjectsKey(agentId),
            JSON.stringify(response.projectList)
          );
          return response;
        } else {
          throw new Error("no projectList key found in response");
        }
      })
      .catch((err) => false);
  },
  fetchAgentsList: async (token, projectId) => {
    return await fetchAgentsList(token, projectId)
      .then((response) => {
        if (response.agentList) {
          return response;
        } else {
          throw new Error("no SQ ProjectList key found in response");
        }
      })
      .catch((err) => false);
  },
  fetchSQProjectList: async (token, projectId) => {
    return await fetchSQProjectList(token, projectId)
      .then((response) => {
        if (response.projectList) {
          return response;
        } else {
          throw new Error("no SQ ProjectList key found in response");
        }
      })
      .catch((err) => false);
  },
};
