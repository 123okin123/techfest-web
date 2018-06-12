//@flow

import {userConstants, type Action} from '../constants';


// let user = (typeof localStorage === 'undefined') ? undefined : JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};

export type AuthState = {
    loggingIn?: boolean,
    role?: string,
    loginFailure?: boolean,
    email?: string
}

export function authentication(state: AuthState = {}, action: Action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                role: action.user.role,
                email: action.user.email
            };
        case userConstants.LOGIN_FAILURE:
            return {loginFailure: true};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}