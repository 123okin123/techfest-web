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
                console.log(r);
                dispatch(success())},
                error => {
                console.log(error);
                dispatch(failure(error))}
            );
    };
    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success() { return { type: userConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function uploadFileAndRegister(user: User, uploadFiles: Array<any>) {
    return (dispatch: any) => {
    let actions = uploadFiles.map(e => {
        return dispatch(uploadActions.upload(e))
    });
    Promise.all(actions).then(uploadSuccess => {
        console.log(`uploadSuccess: ${uploadSuccess}`);
        const keys = uploadSuccess.map((e, i)=> {
            return {[`upload-${i}`]: e.key}
        });
        console.log(`keys: ${keys}`);
        const newUser = {
            ...user,
            participantsFields: {
                ...user.participantsFields,
                keys
            }
        };
        console.log(`newUser: ${newUser}`);
        return dispatch(register(newUser))
    }).catch(error =>console.log(error));
    }
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


