import { FETCHING_TICKETS_BY_PROJECT, FETCH_TICKETS_BY_PROJECT_SUCCESS, FETCH_TICKETS_BY_PROJECT_FAILURE,
         DELETING_TICKET, DELETE_TICKET_SUCCESS, DELETE_TICKET_FAILURE } from '../constants';

const initialState = {
    tickets: [],
    isLoading: false,
    error: null
};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_TICKETS_BY_PROJECT:
            return {
                ...state,
                tickets: [],
                isLoading: true
            }
        case FETCH_TICKETS_BY_PROJECT_SUCCESS:
            return {
                ...state,
                tickets: action.tickets,
                isLoading: false,
                error: null
            }
        case FETCH_TICKETS_BY_PROJECT_FAILURE:
            return {
                ...state,
                tickets: [],
                isLoading: false,
                error: action.data
            }
        case DELETING_TICKET:
            return state;
        case DELETE_TICKET_SUCCESS:
            return {
                ...state,
                tickets: state.tickets.filter(ticket => ticket._id !== action.ticketId),
                isLoading: false,
                error: null
            }
        case DELETE_TICKET_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default ticketReducer;
