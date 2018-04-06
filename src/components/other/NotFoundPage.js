//@flow

import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const NotFoundPage = () => (
    <NotFoundContainer>
        <img className="mt-5" src={require('../../assets/notFound.gif')} alt="notFoundGif"/>
        <h1 className="mt-5">Ups, page not found…</h1>
        <h2>Go to TECHFEST MUNICH home <Link to='/'>here...</Link></h2>
    </NotFoundContainer>
);

const NotFoundContainer = styled.div`
  text-align: center;
`;

export default NotFoundPage;

