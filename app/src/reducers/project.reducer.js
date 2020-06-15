import { FETCHING_PROJECTS, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE,
         FETCHING_PROJECT, FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE } from '../constants';

const initialState = {
    projects: [],
    project: {},
    isLoading: false,
    error: null
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_PROJECTS:
            return {
                ...state,
                projects: [],
                isLoading: true
            }
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.projects,
                isLoading: false,
                error: null
            }
        case FETCH_PROJECTS_FAILURE:
            return {
                ...state,
                projects: [],
                isLoading: false,
                error: action.data
            }
        case FETCHING_PROJECT:
            return {
                ...state,
                project: {},
                isLoading: true
            }
        case FETCH_PROJECT_SUCCESS:
            return {
                ...state,
                project: action.project,
                isLoading: false,
                error: null
            }
        case FETCH_PROJECT_FAILURE:
            return {
                ...state,
                project: [],
                isLoading: false,
                error: action.data
            }
        default:
            return state;
    }
}

export default projectReducer;
