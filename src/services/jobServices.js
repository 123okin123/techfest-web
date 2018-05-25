//@flow


import fetch from "cross-fetch";
import {getCookie} from "../helpers/session";
import {authHeader} from "../helpers";
import {type Job} from '../constants'

const jobServices = {
    fetchJobs,
    saveJob,
    updateJob,
    deleteJob
};

function fetchJobs() :Promise<Array<Job>> {
    const requestOptions = {
        method: 'GET'
    };
    return fetch('/api/jobs/?token=' + getCookie("jwt"), requestOptions)
      .then(handleResponse)
      .then(response=>Promise.resolve(response.jobs));
}

function saveJob(job: Job) :Promise<Job> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
    };
    return fetch('/api/jobs/?token=' + getCookie("jwt"), requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.job));
}

function updateJob(id: string, job: Job): Promise<Job> {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
    };
    return fetch('/api/jobs/'+ id +'?token=' + getCookie("jwt"), requestOptions)
      .then(handleResponse).then(response=>Promise.resolve(response.job));
}

function deleteJob(id: string): Promise<JSON> {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch('/api/jobs/' + id + '?token=' + getCookie("jwt"), requestOptions).then(handleResponse);
}


function handleResponse(response) :Promise<JSON> {
    if (!response.ok) {
        return response.json().then(
          json=> Promise.reject(json.error + ' ' + json.reason)
        , err => Promise.reject('An error occurred.'));
    }
    return response.json();
}


export default jobServices;