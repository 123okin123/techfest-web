//@flow

import fetch from "cross-fetch";

const pageServices = {
    fetchPage
};

function fetchPage(id: string): Promise<{}> {
    return fetch(`/api/public/wp-api/pages/${id}`)
        .then(handleResponse)
        .then(json=> json);
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