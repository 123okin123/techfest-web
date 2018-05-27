import {authHeader} from "../helpers";
import {getCookie} from "../helpers/session";
import {Challenge} from "../constants";

export const challengeServices = {
    getChallenges,
    updateChallenge
};


function getChallenges() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch('/api/challenges/'+'?token=' + getCookie("jwt"), requestOptions).then(handleResponse);
}

function updateChallenge(id: string, challenge: Challenge) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(challenge)
    };
    return fetch('/api/challenges/' + id +'?token=' + getCookie("jwt"), requestOptions).then(handleResponse);
}

function handleResponse(response) :Promise<JSON> {
    if (!response.ok) {
        return Promise.reject('An error occurred.')
    }
    return response.json();
}
