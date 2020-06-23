import { FETCHING_PROJECTS, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE,
         FETCHING_PROJECT, FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE,
         CREATING_PROJECT, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE,
         UPDATING_PROJECT, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE } from '../constants';

import { getAll, getById, create, update } from '../api/project.api';

export const fetchingProjects = () => ({ type: FETCHING_PROJECTS })

export const fetchProjectsSuccess = projects => ({ type: FETCH_PROJECTS_SUCCESS, projects })

export const fetchProjectsFailure = error => ({ type: FETCH_PROJECTS_FAILURE, error })

export const fetchingProject = () => ({ type: FETCHING_PROJECT })

export const fetchProjectSuccess = project => ({ type: FETCH_PROJECT_SUCCESS, project })

export const fetchProjectFailure = error => ({ type: FETCH_PROJECT_FAILURE, error })

export const creatingProject = () => ({ type: CREATING_PROJECT })

export const createProjectSuccess = project => ({ type: CREATE_PROJECT_SUCCESS, project })

export const createProjectFailure = error => ({ type: CREATE_PROJECT_FAILURE, error })

export const updatingProject = () => ({ type: UPDATING_PROJECT })

export const updateProjectSuccess = project => ({ type: UPDATE_PROJECT_SUCCESS, project })

export const updateProjectFailure = error => ({ type: UPDATE_PROJECT_FAILURE, error })

export const getProjects = () => {
    return (dispatch) => {
        dispatch(fetchingProjects());
        return getAll()
            .then(response => {
                dispatch(fetchProjectsSuccess(response.data));
            })
            .catch(error => dispatch(fetchProjectsFailure(error)));
    }
}

export const getProjectById = id => {
    return (dispatch) => {
        dispatch(fetchingProject());
        return getById(id)
            .then(response => {
                dispatch(fetchProjectSuccess(response.data));
            })
            .catch(error => dispatch(fetchProjectFailure(error)));
    }
}

export const addProject = project => {
    return dispatch => {
        dispatch(creatingProject());
        return create(project)
            .then(response => {
                dispatch(createProjectSuccess(response.data));
            })
            .catch(error => dispatch(createProjectFailure(error)));
    }
}

export const modifyProject = project => {
    return dispatch => {
        dispatch(updatingProject());
        return update(project)
            .then(response => {
                if(!response.data) {
                    dispatch(updateProjectFailure(response));
                }
                dispatch(updateProjectSuccess(response.data));
            })
            .catch(error => dispatch(updateProjectFailure(error)));
    }
}
