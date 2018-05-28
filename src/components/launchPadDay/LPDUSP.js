import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import {Bracket, Heading} from "../common";
import styled from "styled-components";

const LPDUSP = (props) =>
  <StyledContainer>
    <Heading title="UNTERNEHMERTUM LAUNCHPAD DAY" subtitle="HOW SELECTED TECHFEST TEAMS AND PARTNERS PROFIT"/>
      <Row className="justify-content-around">
          <Col md="4">
                  <div className="d-flex justify-content-between mb-3">
                      <Bracket/>
                      <HeaderLogo src={require('../../assets/icons/icon_lpd_1.png')}/>
                      <HeaderTitle className="align-self-center p-3 mb-0">PARTNERING</HeaderTitle>
                      <Bracket right/>
                  </div>
                  <ul className="list-style-x text-left">
                      <li>POSSIBLE COOPERATION</li>
                      <li> NETWORKING</li>
                  </ul>
          </Col>
          <Col  md="4">
                  <div className="d-flex justify-content-center mb-3">
                      <Bracket/>
                      <HeaderLogo src={require('../../assets/icons/icon_lpd_2.png')}/>
                      <HeaderTitle className="align-self-center p-3 mb-0">TEAM BUILDING</HeaderTitle>
                      <Bracket right/>
                  </div>
                  <ul className="list-style-x text-left">
                      <li>ROLE DEFINITIONS</li>
                      <li>LEGAL SUPPORT</li>
                  </ul>
          </Col>
      </Row>
      <Row className="justify-content-around mt-5">
          <Col md="4">
                  <div className="d-flex justify-content-center mb-3">
                      <Bracket/>
                      <HeaderLogo src={require('../../assets/icons/icon_launchpad-rocket_black-white.png')}/>
                      <HeaderTitle className="align-self-center p-3 mb-0">FUNDING</HeaderTitle>
                      <Bracket right/>
                  </div>
                  <ul className="list-style-x">
                      <li>COACHING SESSIONS</li>
                      <li>SUPPORT PROGRAMS</li>
                  </ul>
          </Col>
          <Col md="4">
                  <div className="d-flex justify-content-center mb-3">
                      <Bracket/>
                      <HeaderLogo src={require('../../assets/icons/icon_lpd_3.png')}/>
                      <HeaderTitle className="align-self-center p-3 mb-0">IDEA EVALUATION</HeaderTitle>
                      <Bracket right/>
                  </div>
                  <ul className="list-style-x">
                      <li>BUSINESS IMPACT</li>
                      <li> INDUSTRY INSIGHTS</li>
                  </ul>
          </Col>
      </Row>
  </StyledContainer>
;
const HeaderTitle = styled.h3`
  padding: 8px;
  font-size: 1.3em;
  font-weight: 900;
  width: 80%;
  min-height: 80px;
`;
const HeaderLogo = styled.img`
  flex-shrink: 0;
  width: 50px;
  margin: 8px;
  align-self: center;
`;
const StyledContainer = styled(Container)`
margin-bottom: 8em;
`;

export default LPDUSP;