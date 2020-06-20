import { FETCHING_TICKETS_BY_PROJECT, FETCH_TICKETS_BY_PROJECT_SUCCESS, FETCH_TICKETS_BY_PROJECT_FAILURE,
         CREATING_TICKET, CREATE_TICKET_SUCCESS, CREATE_TICKET_FAILURE,
         UPDATING_TICKET, UPDATE_TICKET_SUCCESS, UPDATE_TICKET_FAILURE,
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
        case CREATING_TICKET:
            return {
                ...state,
                isLoading: true
            };
        case CREATE_TICKET_SUCCESS:
            let allTickets = state.tickets;
            allTickets.push(action.ticket);
            return {
                ...state,
                isLoading: false,
                error: null,
                tickets: allTickets  
            }
        case CREATE_TICKET_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case UPDATING_TICKET:
            return {
                ...state,
                isLoading: true
            };
        case UPDATE_TICKET_SUCCESS:
            let tickets = state.tickets.filter(t => t.number !== action.ticket.number);
            tickets.push(action.ticket);
            return {
                ...state,
                isLoading: false,
                error: null,
                tickets: tickets  
            }
        case UPDATE_TICKET_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
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
