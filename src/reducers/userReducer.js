//@flow

import { userConstants, type Action } from '../constants';

type State = {
    +loading?: boolean,
    +updating?: boolean,
    +data?: {},
    +updateSuccess?: boolean,
    +error?: string
}

export function user(state: State = {}, action: Action):State {
    switch (action.type) {
        case userConstants.GET_INFO_REQUEST:
            return { loading: true };
        case userConstants.GET_INFO_SUCCESS:
            return {data: action.user};
        case userConstants.GET_INFO_FAILURE:
            return {error: action.error};
        case userConstants.UPDATE_INFO_REQUEST:
            return {data: state.data, updating: true };
        case userConstants.UPDATE_INFO_SUCCESS:
            return {data: action.user, updateSuccess: true};
        case userConstants.UPDATE_INFO_FAILURE:
            return {error: action.error};
        default:
            return state
    }
}