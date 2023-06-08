import { config } from './config'

export class GQMConfigService {

    static regesterUser(body) {
        return fetch(`${config.GQM.URL}:${config.GQM.PORT}/${config.GQM.API}/${config.GQM.REGISTER}/`, {
            method: `${config.REQ_TYPES.POST}`,
            headers: {
                'Content-Type': `${config.CONTENT_TYPES.APPLICATION_JSON}`
            },
            body: JSON.stringify( body )
        }).then(resp => {
            if (!resp.ok) {
              throw new Error(resp.statusText)
            }
            return resp.json()
          }).catch(err=>{
            console.log(err)
        })
    }

    static loginUser(body) {
        return fetch(`${config.GQM.URL}:${config.GQM.PORT}/${config.GQM.API}/${config.GQM.AUTH}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( body )
        }).then( resp => resp.json())
    }

    static getMetrics() {
        return fetch(`${config.GQM.URL}:${config.GQM.PORT}/${config.GQM.API}/${config.GQM.METRICS}/`, {
            method: `${config.REQ_TYPES.GET}`,
            headers: {
                'Content-Type': `${config.CONTENT_TYPES.APPLICATION_JSON}`
            },
        }).then(resp => {
            if (!resp.ok) {
              throw new Error(resp.statusText)
            }
            return resp.json()
          }).catch(err=>{
            console.log(err)
        })
    }

    static getGoal(token, user_id) {
        return fetch(`${config.GQM.URL}:${config.GQM.PORT}/api/user/goals/`, {
            method: `${config.REQ_TYPES.GET}`,
            headers: {
                'Content-Type': `${config.CONTENT_TYPES.APPLICATION_JSON}`,
                'Authorization': `Token ${token}`
            },
        }).then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          }).catch(err=>{
          console.log(err)
      })
    }

    static createGoal(token, body) {
        return fetch(`${config.GQM.URL}:${config.GQM.PORT}/${config.GQM.API}/${config.GQM.GOALS}/`, {
            method: `${config.REQ_TYPES.POST}`,
            headers: {
                'Content-Type': `${config.CONTENT_TYPES.APPLICATION_JSON}`,
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static deleteGoal(token, id) {
        return fetch(`${config.GQM.URL}:${config.GQM.PORT}/${config.GQM.API}/${config.GQM.GOALS}/${id}`, {
            method: `${config.REQ_TYPES.DELETE}`,
            headers: {
                'Content-Type': `${config.CONTENT_TYPES.APPLICATION_JSON}`,
                'Authorization': `Token ${token}`
            }
        }).then(resp => resp.json())
    }

    static getQuestions(token, goalId) {
        return fetch(`${config.GQM.URL}:${config.GQM.PORT}/api/goal/questions/${goalId}`, {
            method: `${config.REQ_TYPES.GET}`,
            headers: {
                'Content-Type': `${config.CONTENT_TYPES.APPLICATION_JSON}`,
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    console.log('error or nothing to show')
                } else {
                    return response.json()
                }
            })
    }

    static getQuestionById(questionId) {
        return fetch(`${config.GQM.URL}:${config.GQM.PORT}/api/questions/${questionId}`, {
            method: `${config.REQ_TYPES.GET}`,
            headers: {
                'Content-Type': `${config.CONTENT_TYPES.APPLICATION_JSON}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    console.log('error or nothing to show')
                } else {
                    return response.json()
                }
            })
    }

    static createQuestion(token, body) {
        return fetch(`${config.GQM.URL}:${config.GQM.PORT}/${config.GQM.API}/${config.GQM.QUESTIONS}/`, {
            method: `${config.REQ_TYPES.POST}`,
            headers: {
                'Content-Type': `${config.CONTENT_TYPES.APPLICATION_JSON}`,
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static deleteQuestion(token, id) {
        return fetch(`${config.GQM.URL}:${config.GQM.PORT}/api/questions/${id}`, {
            method: `${config.REQ_TYPES.DELETE}`,
            headers: {
                'Content-Type': `${config.CONTENT_TYPES.APPLICATION_JSON}`,
                'Authorization': `Token ${token}`
            }
        }).then(resp => resp.json())
    }

    static assignMetricsToQuestion(questionId, body) {
        return fetch(`${config.GQM.URL}:${config.GQM.PORT}/${config.GQM.API}/question/${config.GQM.ASSIGN_METRICS}/${questionId}`, {
            method: 'PATCH', //`${config.REQ_TYPES.POST}`,
            headers: {
                'Content-Type': `${config.CONTENT_TYPES.APPLICATION_JSON}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
}