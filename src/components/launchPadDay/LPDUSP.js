import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import {Bracket, Heading} from "../common";

const LPDUSP = (props) =>
  <Container>
    <Heading title="UNTERNEHMERTUM LAUNCHPAD DAY" subtitle="HOW SELECTED TECHFEST TEAMS AND PARTNERS PROFIT"/>
      <Row>
          <Col className="d-flex" md="6">
              <img src={require('../../assets/icons/icon_launchpad-rocket_black-white.png')}/>
              <div className="d-flex">
                  <Bracket/>
                  <p>PARTNERING</p>
                  <Bracket right/>
              </div>
          </Col>
          <Col md="6"></Col>
          <Col md="6"></Col>
          <Col md="6"></Col>
      </Row>
  </Container>
;


export default LPDUSP;