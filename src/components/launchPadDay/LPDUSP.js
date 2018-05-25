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
                  <Styledul className="list-style-x text-left">
                      <li>POSSIBLE COOPERATION</li>
                      <li> NETWORKING</li>
                  </Styledul>
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
                  <Styledul className="list-style-x text-left">
                      <li>ROLE DEFINITIONS</li>
                      <li>LEGAL SUPPORT</li>
                  </Styledul>
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
                  <Styledul className="list-style-x text-left">
                      <li>COACHING SESSIONS</li>
                      <li>SUPPORT PROGRAMS</li>
                  </Styledul>
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
                  <Styledul className="list-style-x text-left">
                      <li>BUSINESS IMPACT</li>
                      <li> INDUSTRY INSIGHTS</li>
                  </Styledul>
              </div>
          </Col>
      </Row>
  </StyledContainer>
;

const StyledContainer = styled(Container)`
margin-bottom: 8em;
`;
const Styledul = styled.ul`
& li:before {
  position: static !important;
  margin-right: 10px !important;
}
`;
export default LPDUSP;