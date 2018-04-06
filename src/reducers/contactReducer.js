//@flow

import { contactConstants, type Action } from '../constants';

type State = {
    +contacting?: boolean,
    +contactSuccess?: boolean,
}

export function contact(state: State = {}, action: Action):State {
    switch (action.type) {
        case contactConstants.CONTACT_REQUEST:
            return { contacting: true };
        case contactConstants.CONTACT_SUCCESS:
            return {contactSuccess: true};
        case contactConstants.CONTACT_FAILURE:
            return {contactSuccess: false};
        default:
            return state
    }
}