import { FETCHING_PROJECTS, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE,
         FETCHING_PROJECT, FETCH_PROJECT_SUCCESS, FETCH_PROJECT_FAILURE } from '../constants';

import { getAll, getById } from '../api/project.api';

export const fetchingProjects = () => ({ type: FETCHING_PROJECTS })

export const fetchProjectsSuccess = projects => ({ type: FETCH_PROJECTS_SUCCESS, projects })

export const fetchProjectsFailure = error => ({ type: FETCH_PROJECTS_FAILURE, error })

export const fetchingProject = () => ({ type: FETCHING_PROJECT })

export const fetchProjectSuccess = project => ({ type: FETCH_PROJECT_SUCCESS, project })

export const fetchProjectFailure = error => ({ type: FETCH_PROJECT_FAILURE, error })

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