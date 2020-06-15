import { FETCHING_STATUSES, FETCH_STATUSES_SUCCESS, FETCH_STATUSES_FAILURE } from '../constants';

import { getAll } from '../api/status.api';

export const fetchingStatuses = () => ({ type: FETCHING_STATUSES })

export const fetchStatusesSuccess = statuses => ({ type: FETCH_STATUSES_SUCCESS, statuses })

export const fetchStatusesFailure = error => ({ type: FETCH_STATUSES_FAILURE, error })

export const getStatuses = () => {
    return (dispatch) => {
        dispatch(fetchingStatuses());
        return getAll()
            .then(response => {
                dispatch(fetchStatusesSuccess(response.data));
            })
            .catch(error => dispatch(fetchStatusesFailure(error)));
    }
}