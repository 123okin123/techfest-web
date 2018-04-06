//@flow

import fetch from "cross-fetch";

const contactServices = {
    contact
};

function contact(message: JSON): Promise<void> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    };
    return fetch(`/api/public/contact`, requestOptions)
}

export default contactServices;