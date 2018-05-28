import React from 'react'
import styled from "styled-components";
import {Bracket} from "./Bracket";


export const FileUpload = (props: {upload: Upload, width?: string}) =>
  <UploadDivContainer width={props.width} className="d-flex justify-content-between m-3">
      <Bracket/>
      <a className="p-3" target="_blank" href={props.upload.file}>{props.upload.name}</a>
      <Bracket right/>
  </UploadDivContainer>;

export type Upload = {
    file?: string,
    name?: string,
    preview?: string
}

const UploadDivContainer = styled.div`
  width: ${(props)=> props.width || 'calc(100% - 1rem)'}
`;
