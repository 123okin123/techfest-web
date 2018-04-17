//@flow

import fetch from "cross-fetch";
import {authHeader} from "../helpers";

const pageServices = {
    fetchPage
};

function fetchPage(id: string): Promise<{}> {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/api/public/wp-api/pages/${id}`, requestOptions)
        .then(handleResponse);
}


function handleResponse(response) :Promise<JSON> {
    if (!response.ok) {
        return response.json().then(body => {
            let errorDescription = body.reason || response.statusText;
            return Promise.reject(errorDescription)});
    }
    return response.json();
}


export default pageServices;