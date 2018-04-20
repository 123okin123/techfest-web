//@flow
import {userConstants, type User} from '../constants';
import userService from '../services/userServices';
import { alertActions } from '.';
import { history } from '../helpers/history';
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
                participantsFields: {
                    ...user.participantsFields,
                    keys
                }
            };
            return dispatch(register(newUser))
        })
    };
}


function login(email: string, password: string) {
    return (dispatch: any) => {
        dispatch(request({ email }));
        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
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


