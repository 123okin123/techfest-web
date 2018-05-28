import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import styled from 'styled-components'
import {Heading, Bracket} from '../common'


const LPDIncubation = (props) =>
  <StyledContainer>
      <Heading title="TECH TALENTS AGILE INCUBATION" subtitle="WHAT SELECTED TECHFEST TEAMS CAN GAIN AT UNTERNEHMERTUM LAUNCHPAD DAY"/>
      <p className="mb-5">PARTICIPANTS HAVE THE UNIQUE CHANCE TO GET PARTNER SUPPORT AND TO BE ASSIGNED TO THE TECH TALENTS AGILE INCUBATION PROGRAM TO PURSUE THEIR TECHFEST IDEA.</p>
      <Row>
          <Col md={6}>
              <div className="d-flex justify-content-between mb-4">
              <Bracket/>
              <HeaderTitle>KEY FACTS PROGRAM</HeaderTitle>
              <Bracket right/>
              </div>
              <ul className="list-style-x">
                  <li>AGILE 3-MONTHS COACHING</li>
                  <li>REAL-LIFE EDUCATION IN A VIRTUAL SETTING</li>
                  <li>CONTINUOUS, AGILE TEAM DEVELOPMENT COACHING</li>
                  <li>FINAL PITCHES AT PARTNER COMPANY</li>
                  <li>INFRASTRUCTURE SUPPORT IN PROTOTYPING AND GRANT INVESTMENT</li>
              </ul>
          </Col>
          <Col md={6}>
              <div className="d-flex justify-content-between mb-4">
              <Bracket/>
              <HeaderTitle>AGILE INCUBATION GOALS</HeaderTitle>
              <Bracket right/>
              </div>
              <ul className="list-style-x">
                  <li>IN-DEPTH UNDERSTANDING OF PROBLEM CONTEXT REACHED</li>
                  <li>SOLUTION CONFIRMED & MVP PROTOTYPED</li>
                  <li>MARKET SEGMENTS RESEARCHED & FIRST CUSTOMERS DISCOVERED</li>
                  <li>BUSINESS MODEL & FIRST FINANCIALS CONFIRMED</li>
              </ul>
          </Col>
      </Row>
  </StyledContainer>;


const StyledContainer = styled(Container)`
margin-bottom: 8em;
`;
const HeaderTitle = styled.h3`
  padding: 8px;
  font-size: 1.1em;
  font-weight: 900;
`;

export default LPDIncubation;