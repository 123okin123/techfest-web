

import fetch, {Headers} from 'node-fetch';

export function preFetchLandingPage() {
  let apiURI  = process.env.DEV_API_URI;
  if (process.env.NODE_ENV === 'production') {
    apiURI = process.env.API_URI;
  }
  let myHeaders = new Headers();
  myHeaders.append("x-access-apikey", process.env.TECHFEST_API_KEY);
  return fetch(`${apiURI}/public/wp-api/pages/241`, {headers: myHeaders})
    .then(response => {
      if (!response.ok) {
        return response.json().then(body => {
          let errorDescription = body.reason || response.statusText;
          return Promise.reject(errorDescription)
        });
      }
      return response.json();
    })
    .then(json=> json);
}

