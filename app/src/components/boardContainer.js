import { connect } from 'react-redux';
import { getStatuses } from '../actions/status.action';
import { getTicketsByProjectId, addTicket, modifyTicket, deleteTicketById } from '../actions/ticket.action';
import { getProjectById } from '../actions/project.action';
import { withRouter } from 'react-router-dom';
import Board from './Board/Board.js';

const mapStateToProps = (state, ownProps) => {
    return {
        projectId: ownProps.match.params.id,
        statuses: state.statusReducer.statuses || [],
        isLoading: state.statusReducer.isLoading || state.ticketReducer.isLoading || false,
        tickets: state.ticketReducer.tickets || null,
        ticket: state.ticketReducer.ticket || null,
        project: state.projectReducer.project || null,
        error: state.ticketReducer.error || null,
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
        addTicket: ticket => {
            return dispatch(addTicket(ticket));
        },
        modifyTicket: ticket => {
            return dispatch(modifyTicket(ticket));
        },
        deleteTicketById: id => {
            return dispatch(deleteTicketById(id));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));
