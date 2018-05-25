import React from 'react'
import styled from "styled-components";

export const DropZoneImagePreview = (props) => {
    if (props.isUploading) {
        return (<div><strong>uploading...</strong></div>);
    }
    if (props.isUploadError) {
        return (<div className="text-danger"><strong>error</strong></div>)
    }
    if (props.isUploadSuccess) {
        return (<PreviewImage preview={props.preview}/>);
    }
    return (<div>Drop file here (max size: 2mb | format: jpg/png)</div>);
};

const PreviewImage = styled.div`
background: url(${(props)=> props.preview}) no-repeat center;
background-size: cover;
height: 100%;
width: 100%;
`;