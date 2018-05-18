import React from 'react';

export const DropZoneChildComponent = (props) => {
    if (props.isUploading) {
        return (<div><strong>uploading...</strong></div>);
    }
    if (props.isUploadError) {
        return (<div className="text-danger"><strong>error</strong></div>)
    }
    if (props.isUploadSuccess) {
        return (<div className="text-success"><strong>success</strong></div>);
    }
    return (<div>{props.hint || 'Drop file here (max size: 5mb | format: pdf)'}</div>);
};

