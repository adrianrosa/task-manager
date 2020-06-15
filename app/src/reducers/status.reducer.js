import { FETCHING_STATUSES, FETCH_STATUSES_FAILURE, FETCH_STATUSES_SUCCESS } from '../constants';

const initialState = {
    statuses: [],
    isLoading: false,
    error: null
};

const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_STATUSES:
            return {
                ...state,
                statuses: [],
                isLoading: true
            }
        case FETCH_STATUSES_SUCCESS:
            return {
                ...state,
                statuses: action.statuses,
                isLoading: false,
                error: null
            }
        case FETCH_STATUSES_FAILURE:
            return {
                ...state,
                statuses: [],
                isLoading: false,
                error: action.data
            }
        default:
            return state;
    }
}

export default statusReducer;
