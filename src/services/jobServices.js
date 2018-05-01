//@flow


import fetch from "cross-fetch";
import {getCookie} from "../helpers/session";
import {authHeader} from "../helpers";

const jobServices = {
    fetchJobs,
    saveJob,
    updateJob,
    deleteJob
};

function fetchJobs() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch('/api/jobs/?token=' + getCookie("jwt"), requestOptions)
      .then(handleResponse)
      .then(response=>Promise.resolve(response.jobs));
}

function saveJob(job: {}) :Promise<JSON> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
    };
    return fetch('/api/jobs/?token=' + getCookie("jwt"), requestOptions).then(handleResponse);
}

function updateJob(id: string, job: {}) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
    };

    return fetch('/api/jobs/'+ id +'?token=' + getCookie("jwt"), requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.job));
}

function deleteJob(id: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch('/api/jobs/' + id + '?token=' + getCookie("jwt"), requestOptions).then(handleResponse);
}


function handleResponse(response) :Promise<JSON> {
    if (!response.ok) {
        return Promise.reject('An error occurred.')
    }
    return response.json();
}


export default jobServices;