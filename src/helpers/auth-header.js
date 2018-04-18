//@flow

import {getCookie} from "./session";

export function authHeader() {
    // return authorization header with jwt token
    //let user = JSON.parse(localStorage.getItem('user'));

    const jwt = getCookie("jwt");
    if (jwt) {
        return { 'Authorization': 'Bearer ' + jwt };
    } else {
        return {};
    }
}