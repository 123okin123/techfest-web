

import fetch, {Headers} from 'node-fetch';
import 'whatwg-fetch-timeout'


export function preFetchLandingPage() {
  let apiURI  = process.env.DEV_API_URI;
  if (process.env.NODE_ENV === 'production') {
    apiURI = process.env.API_URI;
  }
  let myHeaders = new Headers();
  myHeaders.append("x-access-apikey", process.env.TECHFEST_API_KEY);
  return fetch(`${apiURI}/public/wp-api/pages/241`, {headers: myHeaders, timeout: 7000})
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error('Network response was not ok.');
    })
}

