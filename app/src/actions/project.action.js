import { FETCHING_PROJECTS, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE } from '../constants';

import { getAll } from '../api/project.api';

export const fetchingProjects = () => ({ type: FETCHING_PROJECTS })

export const fetchProjectSuccess = projects => ({ type: FETCH_PROJECTS_SUCCESS, projects })

export const fetchProjectFailure = error => ({ type: FETCH_PROJECTS_FAILURE, error })

export const getProjects = () => {
    return (dispatch) => {
        dispatch(fetchingProjects());
        return getAll()
            .then(response => {
                dispatch(fetchProjectSuccess(response.data));
            })
            .catch(error => dispatch(fetchProjectFailure(error)));
    }
}