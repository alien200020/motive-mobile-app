import {
    CHANGE_GOAL_DESCRIPTION,
    CHANGE_GOAL_NAME,
    CLOSE_GOAL_TASK,
    CREATE_GOAL_TASK,
    CREATE_NEW_GOAL,
    DELETE_GOAL,
    DELETE_GOAL_TASK,
    SET_GOAL,
    UPDATE_GOAL,
    UPDATE_GOAL_TASKS,
    UPDATE_USER_GOALS
} from '../actions/goalsActions'

const INITIAL_STATE = {
    goal: {},
    goals: [],
    listFilter: 'all'
}

const reduce = (state, payload) => {
    const { goalId, taskId } = payload
    const goals = []
    for (const goal of state.goals) {
        goals.push(goal.id === goalId ? { ...goal, tasks: goal.tasks.filter(t => t.id !== taskId) } : goal)
    }
    return { ...state, goal: { ...state.goal, tasks: state.goal.tasks.filter(t => t.id !== taskId) }, goals }
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action
    if (type === SET_GOAL) {
        return { ...state, goal: payload }
    } else if (type === CHANGE_GOAL_NAME) {
        const goal = { ...state.goal, name: payload }
        return { ...state, goal }
    } else if (type === CHANGE_GOAL_DESCRIPTION) {
        const goal = { ...state.goal, description: payload }
        return { ...state, goal }
    } else if (type === CREATE_NEW_GOAL) {
        return { ...state, goals: [payload, ...state.goals] }
    } else if (type === UPDATE_USER_GOALS) {
        return { ...state, goals: payload }
    } else if (type === UPDATE_GOAL_TASKS) {
        const { listFilter, tasks } = payload
        return { ...state, listFilter, goal: { ...state.goal, tasks } }
    } else if (type === CREATE_GOAL_TASK) {
        const { goalId, task } = payload
        const goals = []
        for (const goal of state.goals) {
            goals.push(goal.id === goalId ? { ...goal, tasks: [task, ...goal.tasks] } : goal)
        }
        return { ...state, goal: { ...state.goal, tasks: [task, ...state.goal.tasks] }, goals }
    } else if (type === CLOSE_GOAL_TASK) {
        return reduce(state, payload)
    } else if (type === DELETE_GOAL_TASK) {
        return reduce(state, payload)
    } else if (type === UPDATE_GOAL) {
        const goals = []
        for (const goal of state.goals) {
            goals.push(goal.id === payload.id ? { ...goal, ...payload } : goal)
        }
        return { ...state, goals }
    } else if (type === DELETE_GOAL) {
        return { ...state, goals: state.goals.filter(g => g.id !== payload) }
    } else {
        return state
    }
}
