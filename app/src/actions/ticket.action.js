import { FETCHING_TICKETS_BY_PROJECT, FETCH_TICKETS_BY_PROJECT_SUCCESS, FETCH_TICKETS_BY_PROJECT_FAILURE } from '../constants';

import { getAllByProjectId } from '../api/ticket.api';

export const fetchingTickets = () => ({ type: FETCHING_TICKETS_BY_PROJECT })

export const fetchTicketsSuccess = tickets => ({ type: FETCH_TICKETS_BY_PROJECT_SUCCESS, tickets })

export const fetchTicketsFailure = error => ({ type: FETCH_TICKETS_BY_PROJECT_FAILURE, error })

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