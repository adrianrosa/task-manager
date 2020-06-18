import { connect } from 'react-redux';
import { getStatuses } from '../actions/status.action';
import { getTicketsByProjectId, deleteTicketById } from '../actions/ticket.action';
import { getProjectById } from '../actions/project.action';
import { withRouter } from 'react-router-dom';
import Board from './Board/Board.js';

const mapStateToProps = (state, ownProps) => {
    return {
        projectId: ownProps.match.params.id,
        statuses: state.statusReducer.statuses || [],
        isLoading: state.statusReducer.isLoading || state.ticketReducer.isLoading || false,
        tickets: state.ticketReducer.tickets || null,
        project: state.projectReducer.project || null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStatuses: () => {
            return dispatch(getStatuses());
        },
        getProjectById: id => {
            return dispatch(getProjectById(id));
        },
        getTicketsByProjectId: projectId => {
            return dispatch(getTicketsByProjectId(projectId));
        },
        deleteTicketById: id => {
            return dispatch(deleteTicketById(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));
