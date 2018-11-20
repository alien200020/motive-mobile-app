import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeGoalDescriptionAction, setGoalAction, updateGoalAction } from '../../../actions/goalsActions'
import request from 'superagent'
import { API_URL } from '../../../const'
import { translate } from 'react-i18next'
import { DescriptionEditView } from '../DescriptionEditView'
import { fetchToken } from '../../../services/accountService'

const mapStateToProps = state => ({
    editableEntity: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setEditableEntity: navigation => dispatch => {
        const goal = navigation.getParam('goal')
        dispatch(setGoalAction(goal))
    },

    setDescription: description => dispatch => dispatch(changeGoalDescriptionAction(description)),

    saveEditableEntity: entity => async dispatch => {
        const token = await fetchToken()
        const { id, description } = entity
        const { body } = await request.put(`${API_URL}/goals/${id}`).set('Cookie', token).send({ description })
        dispatch(updateGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(DescriptionEditView))