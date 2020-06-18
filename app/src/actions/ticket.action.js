import { FETCHING_TICKETS_BY_PROJECT, FETCH_TICKETS_BY_PROJECT_SUCCESS, FETCH_TICKETS_BY_PROJECT_FAILURE,
         DELETING_TICKET, DELETE_TICKET_FAILURE, DELETE_TICKET_SUCCESS } from '../constants';

import { getAllByProjectId, deleteTicket } from '../api/ticket.api';

export const fetchingTickets = () => ({ type: FETCHING_TICKETS_BY_PROJECT })

export const fetchTicketsSuccess = tickets => ({ type: FETCH_TICKETS_BY_PROJECT_SUCCESS, tickets })

export const fetchTicketsFailure = error => ({ type: FETCH_TICKETS_BY_PROJECT_FAILURE, error })

export const deletingTicket = () => ({ type: DELETING_TICKET })

export const deleteTicketSuccess = ticketId => ({ type: DELETE_TICKET_SUCCESS, ticketId })

export const deleteTicketFailure = error => ({ type: DELETE_TICKET_FAILURE, error })

export const getTicketsByProjectId = projectId => {
    return (dispatch) => {
        dispatch(fetchingTickets());
        return getAllByProjectId(projectId)
            .then(response => {
                dispatch(fetchTicketsSuccess(response.data));
            })
            .catch(error => dispatch(fetchTicketsFailure(error)));
    }
}

export const deleteTicketById = id => {
    return dispatch => {
        dispatch(deletingTicket());
        return deleteTicket(id)
            .then(response => {
                dispatch(deleteTicketSuccess(id));
            })
            .catch(error => dispatch(deleteTicketFailure(error)));
    }
}
