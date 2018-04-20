//@flow
import {userConstants, type User} from '../constants';
import userService from '../services/userServices';
//import { history } from '../helpers/history';
import { uploadActions} from './uploadActions';

export const userActions = {
    register,
    uploadFileAndRegister,
    login,
    logout
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
    return (dispatch, getState) => {
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
        dispatch(request({ email }));
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

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


