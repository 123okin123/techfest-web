import React from 'react'
import styled from "styled-components";
import {Bracket} from "./Bracket";


export const FileUpload = (props: {upload: Upload, width?: string}) =>
  <UploadDivContainer width={props.width} className="d-flex justify-content-between m-3">
      <Bracket/>
          <Link  className="text-center p-1" target="_blank" href={props.upload.file}>
            {props.upload.preview ?
              <PreviewImage height="50px" src={props.upload.preview}/> :
              <PreviewImage height="50px" src={require('../../assets/TF_logoNEW_ square_black_small.png')}/>
            }
            <p className="text-dark m-0">{props.upload.name}</p>
          </Link>
      <Bracket right/>
  </UploadDivContainer>;

export type Upload = {
    file?: string,
    name?: string,
    preview?: string
}
const Link = styled.a`
text-decoration: none;
transition: transform 0.3s;
&:hover {
text-decoration: none;
  transform: scale(0.8);
}
`;
const PreviewImage = styled.img`
    display: block;
    margin: 10px auto 10px auto;
`;
const UploadDivContainer = styled.div`
  width: ${(props)=> props.width || 'calc(100% - 1rem)'}
`;
