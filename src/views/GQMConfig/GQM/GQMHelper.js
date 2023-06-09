import { GQMConfigService } from '../../../services/GQMConfigService'

export const saveUser = (username, password) => {
    return new Promise((resolve, reject) => {
        resolve(GQMConfigService.regesterUser({ username, password }))
    })
}

export const getUser = (username, password) => {
    return new Promise((resolve, reject) => {
        resolve(GQMConfigService.loginUser({ username, password }))
    })
}

export const getGoal = (token, user_id) => {
    return new Promise((resolve, reject) => {
        resolve(GQMConfigService.getGoal(token, user_id))
    })
}

export const saveGoal = (token, goal, user_id) => {
    let body = {
        "content": goal,
        "user_id": user_id,
    }
    return new Promise((resolve, reject) => {
        resolve(GQMConfigService.createGoal(token, body))
    })
}

export const deleteGoal = (token, id) => {
    return new Promise((resolve, reject) => {
        resolve(GQMConfigService.deleteGoal(token, id))
    })
}

export const getQuestions = (token, goalId) => {
    return new Promise((resolve, reject) => {
        resolve(GQMConfigService.getQuestions(token, goalId))
    })
}

export const saveQuestion = (token, question, goalId) => {
    let body = {
        "content": question,
        "goal_id": goalId
    }
    return new Promise((resolve, reject) => {
        resolve(GQMConfigService.createQuestion(token, body))
    })
}

export const deleteQuestion = (token, id) => {
    return new Promise((resolve, reject) => {
        resolve(GQMConfigService.deleteQuestion(token, id))
    })
}

export const getQuestionById = async (id) => {
    return await GQMConfigService.getQuestionById(id)
}

export const assignMetricsToQuestion = async (listOfMetrics, questionId) => {
    let body = {
        "name":  listOfMetrics.map(el => { return String(el.content) })[0]
    }
    await GQMConfigService.assignMetricsToQuestion(questionId, body)
}

export const getMetrics = async () => {
    return await GQMConfigService.getMetrics()
}