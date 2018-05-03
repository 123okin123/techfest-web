//@flow
import {userConstants, type User} from '../constants';
import userService from '../services/userServices';
//import { history } from '../helpers/history';
import { uploadActions} from './uploadActions';
import type {Dispatch} from "../constants";
import type {UserState} from "../reducers/userReducer";

export const userActions = {
    register,
    uploadFileAndRegister,
    login,
    logout,
    update,
    getInfo,
    fetchInfoIfNeeded
};


function register(user: User) :(any)=>void {
    return (dispatch: any) => {
        dispatch(request());
        return userService.register(user)
            .then( r => {
                dispatch(success())},
                error => {
                dispatch(failure(error));
                    throw error}
            );
    };
    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success() { return { type: userConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function uploadFileAndRegister(user: User, uploadFiles: Array<any>) {
    return (dispatch: Dispatch, getState) => {
        return dispatch(uploadActions.uploadMulti(uploadFiles)).then(()=>{
            const keys = getState().upload.keys.map((e, i)=> {
                return {[`upload-${i}`]: e}
            });
            const newUser = {
                ...user,
                    keys
            };
            return dispatch(register(newUser))
        })
    };
}


function login(email: string, password: string) {
    return (dispatch: any) => {
        dispatch(request());
        return userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    return Promise.resolve();
                },
                error => {
                    dispatch(failure(error));
                    return Promise.reject(error);
                }
            );
    };

    function request() { return { type: userConstants.LOGIN_REQUEST } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function update(user: {}) {
    return (dispatch: any) => {
        dispatch(request({ user }));
        return userService.update(user)
          .then(
            user => {
                dispatch(success(user));
                return Promise.resolve();
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            }
          );
    };

    function request(user) { return { type: userConstants.UPDATE_INFO_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_INFO_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_INFO_FAILURE, error } }
}

function fetchInfoIfNeeded() {
    return (dispatch: Dispatch, getState: () => UserState): Promise<void> => {
        if (shouldFetchInfo(getState())) {
            return dispatch(getInfo())
        } else {
            return Promise.resolve();
        }
    }
}
function shouldFetchInfo(state: UserState) :boolean {
    const user = state.data;
    if (!user) {
        return true
    } else if (state.fetchingState.fetching) {
        return false
    } else {
        return false
    }
}

function getInfo() {
    return (dispatch: any) => {
        dispatch(request());
        return userService.getMe()
          .then(
            user => {
                dispatch(success(user));
                return Promise.resolve();
            },
            error => {
                dispatch(failure(error));
                return Promise.reject(error);
            }
          );
    };

    function request(user) { return { type: userConstants.GET_INFO_REQUEST } }
    function success(user) { return { type: userConstants.GET_INFO_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_INFO_FAILURE, error } }
}

