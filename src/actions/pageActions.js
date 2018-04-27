//@flow

import {pageConstants} from '../constants'
import pageServices from '../services/pageServices'
import {type Pages} from '../reducers/pageReducer'



export const pageActions = {
    fetchPageIfNeeded
};

function fetchPageIfNeeded(id: string) {
    return (dispatch: any, getState: () => Pages) => {
        if (shouldFetchPage(getState(), id)) {
            return dispatch(fetchPage(id))
        }
    }
}

function fetchPage(id: string) {
    return (dispatch: any) => {
        dispatch(request(id));
        return pageServices.fetchPage(id)
            .then(
                response => {
                    dispatch(success(response, id));
                    return Promise.resolve();
                },
                error => {
                    dispatch(failure(error, id));
                    return Promise.reject(error);
                })
    };
    function request(id) {return {type: pageConstants.PAGE_REQUEST, id}}
    function success(response, id) {return {type: pageConstants.PAGE_SUCCESS, id, response}}
    function failure(error, id) {return {type: pageConstants.PAGE_FAILURE, id, error}}
}

function shouldFetchPage(state: Pages, id: string) :boolean {
    const page = state.pages[id];
    if (!page) {
        return true
    } else if (page.isFetching) {
        return false
    } else {
        return false
    }
}

