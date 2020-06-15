import { FETCHING_TICKETS_BY_PROJECT, FETCH_TICKETS_BY_PROJECT_SUCCESS, FETCH_TICKETS_BY_PROJECT_FAILURE } from '../constants';

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
        default:
            return state;
    }
}

export default ticketReducer;
