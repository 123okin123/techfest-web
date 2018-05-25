import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import {Bracket, Heading} from "../common";
import styled from "styled-components";

const LPDUSP = (props) =>
  <StyledContainer>
    <Heading title="UNTERNEHMERTUM LAUNCHPAD DAY" subtitle="HOW SELECTED TECHFEST TEAMS AND PARTNERS PROFIT"/>
      <Row className="justify-content-center">
          <Col className="d-flex align-items-center justify-content-center" md="6">
              <img width="70px" src={require('../../assets/icons/icon_launchpad-rocket_black-white.png')}/>
              <div className="p-3 text-center">
                  <div className="d-flex justify-content-center mb-3">
                      <Bracket/>
                      <p className="align-self-center p-3 mb-0">PARTNERING</p>
                      <Bracket right/>
                  </div>
                  <p>POSSIBLE COOPERATION<br/> NETWORKING</p>
              </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center" md="6">
              <img width="70px" src={require('../../assets/icons/icon_launchpad-rocket_black-white.png')}/>
              <div className="p-3 text-center">
                  <div className="d-flex justify-content-center mb-3">
                      <Bracket/>
                      <p className="align-self-center p-3 mb-0">TEAM BUILDING</p>
                      <Bracket right/>
                  </div>
                  <p>ROLE DEFINITIONS<br/> LEGAL SUPPORT</p>
              </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center" md="6">
              <img width="70px" src={require('../../assets/icons/icon_launchpad-rocket_black-white.png')}/>
              <div className="p-3 text-center">
                  <div className="d-flex justify-content-center mb-3">
                      <Bracket/>
                      <p className="align-self-center p-3 mb-0">FUNDING</p>
                      <Bracket right/>
                  </div>
                  <p>COACHING SESSIONS<br/> SUPPORT PROGRAMS</p>
              </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center" md="6">
              <img width="70px" src={require('../../assets/icons/icon_launchpad-rocket_black-white.png')}/>
              <div className="p-3 text-center">
                  <div className="d-flex justify-content-center mb-3">
                      <Bracket/>
                      <p className="align-self-center p-3 mb-0">IDEA EVALUATION</p>
                      <Bracket right/>
                  </div>
                  <p>BUSINESS IMPACT<br/> INDUSTRY INSIGHTS</p>
              </div>
          </Col>
      </Row>
  </StyledContainer>
;

const StyledContainer = styled(Container)`
margin-bottom: 8em;
`;

export default LPDUSP;