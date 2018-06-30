//@flow
import React from 'react'
import {Container} from 'reactstrap'


const VideoContainer = () => (
    <Container className="text-center">
        <video className="w-100" controls>
            <source src="https://s3.eu-central-1.amazonaws.com/techfest-wp-admin/TF+MASTER+ALL_2.mp4" type="video/mp4"/>
        </video>
    </Container>
);


export default VideoContainer;

