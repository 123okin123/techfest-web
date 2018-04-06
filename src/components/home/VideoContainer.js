//@flow
import React from 'react'
import {Container} from 'reactstrap'


const VideoContainer = () => (
    <Container className="text-center">
        <video className="w-100" controls preload="none" poster={require('../../assets/video_poster.png')}>
            <source src={require('../../assets/MASTER TF_2018_3.mp4')} type="video/mp4"/>
        </video>
    </Container>
);


export default VideoContainer;

