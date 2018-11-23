import { bindActionCreators } from 'redux'
import {
    closeTaskAction,
    createTask,
    deleteTaskAction,
    hideClosedTasksAction,
    setFilterAction,
    showClosedTasksAction,
    undoCloseTaskAction,
    updateClosedUserTasksAction,
    updateUserTasksAction
} from '../../actions/tasksActions'
import { closeTask, doDeleteTask, fetchClosedTasks, fetchTasks, undoCloseTask } from '../../services/taskService'
import { fetchToken } from '../../services/accountService'
import request from 'superagent'
import { API_URL } from '../../const'
import moment from 'moment'
import connect from 'react-redux/es/connect/connect'
import { translate } from 'react-i18next'
import { AllTasksView } from './AllTasksView'

const mapStateToProps = state => ({
    tasks: state.tasks.tasks,
    closedTasks: state.tasks.closedTasks,
    closedTasksAreShown: state.tasks.closedTasksAreShown
})

const mapDispatchToProps = dispatch => bindActionCreators({

    updateUserTasks: (closed, listFilter) => async (dispatch, getState) => {
        if (closed) {
            const { closedTasksAreShown } = getState().tasks
            if (closedTasksAreShown) {
                dispatch(hideClosedTasksAction())
            } else {
                dispatch(updateClosedUserTasksAction(await fetchClosedTasks()))
                dispatch(showClosedTasksAction())
            }
        } else {
            dispatch(setFilterAction(listFilter))
            dispatch(updateUserTasksAction(await fetchTasks(listFilter)))
        }
    },

    createTask: task => async (dispatch, getState) => {
        const { tasks } = getState()
        const { listFilter } = tasks
        const token = await fetchToken()
        if (listFilter === 'today') {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({
                ...task,
                dueDate: moment().endOf('day')
            })
            dispatch(createTask(body))
        } else if (listFilter === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({
                ...task,
                dueDate: moment().endOf('week')
            })
            dispatch(createTask(body))
        } else {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send(task)
            dispatch(createTask(body))
        }
    },

    closeTask: id => async dispatch => {
        const task = await closeTask(id)
        dispatch(closeTaskAction(task.id))
    },

    undoCloseTask: id => async dispatch => {
        const task = await undoCloseTask(id)
        dispatch(undoCloseTaskAction(task.id))
    },

    deleteTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteTaskAction(id))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(AllTasksView))