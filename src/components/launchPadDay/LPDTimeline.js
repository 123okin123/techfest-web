import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import styled from 'styled-components'

const LPDTimeline = (props) =>
  <StyledContainer>
      <h2 className="mb-5">TIMELINE LAUNCHPAD DAY 2018</h2>
      <Row>
          <Col md={4}>
              <DayTime>MORNING</DayTime>
              <p>Keynote & Start-up insight</p>
              <p>Offerings & Goals</p>
              <p>Get to know each other</p>
          </Col>
          <Col md={4}>
              <DayTime>LUNCHTIME</DayTime>
              <p>Barbecue by the Lake</p>
              <p>Networking</p>
              <p>Partnerships & Business opportunities</p>
          </Col>
          <Col md={4}>
              <DayTime>AFTERNOON</DayTime>
              <p>Commitments</p>
              <p>Outlook</p>
              <p>Enjoy Lake Wörthsee</p>
          </Col>
      </Row>
  </StyledContainer>;

const StyledContainer = styled(Container)`
margin-bottom: 8em;
`;

const DayTime = styled.p`
  font-size: 1.4em;
`;

export default LPDTimeline;