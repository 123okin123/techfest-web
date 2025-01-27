
import fetch from "cross-fetch";
import { authHeader } from '../helpers';
import {type User} from "../constants";
import {setCookie, removeCookie, getCookie} from "../helpers/session";

const userService = {
    login,
    logout,
    register,
    getById,
    getMe,
    getUsers,
    update,
    delete: _delete
};


function login(email: string, password: string) :Promise<User> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    return fetch('/api/public/login', requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                setCookie("jwt",user.token);
                setCookie("role",user.role);
                //localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    removeCookie("jwt");
    removeCookie("role");
    // if (!(typeof localStorage === 'undefined')) {
    //     localStorage.removeItem('user');
    // }
    // remove user from local storage to log user out
}

function getUsers() :Promise<{users: Array<User>, current: number, pages: number}>{
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/users?token=' + getCookie("jwt") , requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/users/' + id, requestOptions).then(handleResponse);
}

function getMe(): Promise<{}> {
    const requestOptions = {
        method: 'GET',
    };
    return fetch('/api/users/me?token=' + getCookie("jwt") , requestOptions).then(handleResponse);
}

function register(user: User) :Promise<{}> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch('/api/public/register', requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/api/users/me?token=' + getCookie("jwt"), requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/users/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) :Promise<JSON> {
    if (!response.ok) {
        return Promise.reject('An error occurred.')
    }
    return response.json();
}


export default userService;