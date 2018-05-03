//@flow

import { userConstants, type Action } from '../constants';
import {type User} from "../constants/userConstants";

export type UserState = {
    +data?: User,
    +fetchingState: {
        +fetching?: boolean,
        +fetchError?: string,
        +fetchSuccess?: boolean
    },
    +updatingState: {
        +updateError?: string,
        +updating?: boolean,
        +updateSuccess?: boolean
    }
}

export function user(state: UserState = {fetchingState: {}, updatingState: {}}, action: Action):UserState {
    switch (action.type) {
        case userConstants.GET_INFO_REQUEST:
            return { fetchingState: {fetching: true }, updatingState: {}};
        case userConstants.GET_INFO_SUCCESS:
            return { data: action.user, fetchingState: {fetchSuccess: true }, updatingState: {}};
        case userConstants.GET_INFO_FAILURE:
            return { fetchingState: {fetchError: action.error}, updatingState: {}};
        case userConstants.UPDATE_INFO_REQUEST:
            return {data: state.data, updatingState: { updating: true }, fetchingState: {}};
        case userConstants.UPDATE_INFO_SUCCESS:
            return {data: action.user, updatingState: { updateSuccess: true }, fetchingState: {}};
        case userConstants.UPDATE_INFO_FAILURE:
            return {updatingState: { updateError: action.error }, fetchingState: {}};
        default:
            return state
    }
}