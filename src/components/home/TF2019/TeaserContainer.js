import React from 'react'
import {Row, Col} from 'reactstrap'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const TeaserContainer = () => <Row>
    <StyledCol lg={6} img={require('../../../assets/images/techfest.jpg')}><StyledLink to={'/2018'}>TECHFEST MUNICH 2018</StyledLink></StyledCol>
    <StyledCol lg={6} img={require('../../../assets/images/lpd.jpg')}><StyledLink to={'/launchpad-day'}>What´s happened next?</StyledLink></StyledCol>
</Row>;



const StyledCol = styled(Col)`
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  height: 400px;
  text-align: center;
  font-size: 2em;
  font-weight: 900;
  line-height: 400px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.2);
    z-index: 100;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;
export default TeaserContainer;