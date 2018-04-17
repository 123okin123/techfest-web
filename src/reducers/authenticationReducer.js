import {userConstants, type Action} from '../constants';


let user = (typeof localStorage === 'undefined') ? undefined : JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action: Action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {loginFailure: true};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}