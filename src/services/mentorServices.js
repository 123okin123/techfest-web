//@flow


import fetch from "cross-fetch";
import {getCookie} from "../helpers/session";
import {authHeader} from "../helpers";

const mentorServices = {
    fetchMentors,
    saveMentor,
    updateMentor,
    deleteMentor
};

function fetchMentors() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch('/api/mentors/?token=' + getCookie("jwt"), requestOptions)
      .then(handleResponse)
      .then(response=>Promise.resolve(response.mentors));
}

function saveMentor(mentor: {}) :Promise<JSON> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mentor)
    };
    return fetch('/api/mentors/?token=' + getCookie("jwt"), requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.mentor));
}

function updateMentor(id: string, mentor: {}) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(mentor)
    };
    return fetch('/api/mentors/'+ id +'?token=' + getCookie("jwt"), requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.mentor));
}

function deleteMentor(id: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch('/api/mentors/' + id + '?token=' + getCookie("jwt"), requestOptions).then(handleResponse);
}


function handleResponse(response) :Promise<JSON> {
    if (!response.ok) {
        return response.json().then(
          json=> Promise.reject(json.error + ' ' + json.reason)
          , err => Promise.reject('An error occurred.'));
    }
    return response.json();
}


export default mentorServices;