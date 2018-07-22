//@flow
import React from 'react'
import {Container} from 'reactstrap'


type Props = {
    videoURL: string,
    posterURL?: string
};

const VideoContainer = (props: Props) => (
    <Container className="text-center">
        <video className="w-100" controls preload="metadata" poster={props.posterURL}>
            <source src={props.videoURL} type="video/mp4"/>
        </video>
    </Container>
);


export default VideoContainer;

