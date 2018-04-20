//@flow

import {uploadConstants} from "../constants";
import type {Action} from "../constants";

type State = {
    +uploading?: boolean,
    +uploadingSuccess?: boolean,
    +keys?: Array<string>

}

export function upload(state: State = {}, action: Action):State {
    switch (action.type) {
        case uploadConstants.UPLOAD_REQUEST:
            return {uploading: true};
        case uploadConstants.UPLOAD_SUCCESS:
            return {keys: action.keys, uploadingSuccess: true};
        case uploadConstants.UPLOAD_FAILURE:
            return {uploadingSuccess: false};
        default:
            return state
    }
}