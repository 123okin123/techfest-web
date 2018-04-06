//@flow

import {uploadConstants, type Action } from "../constants";
import uploadServices from "../services/uploadServices";


export const uploadActions = {
    upload
};

function upload(file: any) {
    return (dispatch: any) => {
        if (file === null || (Object.keys(file).length === 0 && file.constructor === Object)) {
            dispatch(failure('no file.'));
            return
        }
        dispatch(request());
        return uploadServices.uploadToS3(file)
            .then(
                key => dispatch(success(key)),
                error => dispatch(failure(error))
            );
    };

    function request() :Action { return { type: uploadConstants.UPLOAD_REQUEST } }
    function success(key) :Action { return { type: uploadConstants.UPLOAD_SUCCESS , key} }
    function failure(error) :Action { return { type: uploadConstants.UPLOAD_FAILURE, error } }
}

