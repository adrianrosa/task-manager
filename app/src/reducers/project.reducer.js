import { FETCHING_PROJECTS, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE,
         FETCHING_PROJECT, FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE,
         CREATING_PROJECT, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE,
         UPDATING_PROJECT, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE } from '../constants';

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
        case CREATING_PROJECT:
            return {
                ...state,
                isLoading: true
            };
        case CREATE_PROJECT_SUCCESS:
            let allProjects = state.projects;
            allProjects.push(action.project);
            return {
                ...state,
                isLoading: false,
                error: null,
                projects: allProjects  
            }
        case CREATE_PROJECT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case UPDATING_PROJECT:
            return {
                ...state,
                isLoading: true
            };
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                project: action.project  
            }
        case UPDATE_PROJECT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error.message
            }
        default:
            return state;
    }
}

export default projectReducer;
