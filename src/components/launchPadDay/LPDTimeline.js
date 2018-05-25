import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import styled from 'styled-components'

const LPDTimeline = (props) =>
  <StyledContainer>
      <h2 className="mb-5">TIMELINE LAUNCHPAD DAY 2018</h2>
      <Row>
          <Col md={4} className="p-5 text-center">
              <div className="border-light border p-3">
              <DayTime>MORNING</DayTime>
              <p>Keynote & Start-up insight</p><Dot/>
              <p>Offerings & Goals</p><Dot/>
              <p>Get to know each other</p>
              </div>
          </Col>
          <Col md={4} className="p-5 text-center">
              <div className="border-light border p-3">
              <DayTime>LUNCHTIME</DayTime>
              <p>Barbecue by the Lake</p><Dot/>
              <p>Networking</p><Dot/>
              <p>Partnerships & Business opportunities</p>
              </div>
          </Col>
          <Col md={4} className="p-5 text-center">
              <div className="border-light border p-3">
              <DayTime>AFTERNOON</DayTime>
              <p>Commitments</p><Dot/>
              <p>Outlook</p><Dot/>
              <p>Enjoy Lake Wörthsee</p>
              </div>
          </Col>
      </Row>
  </StyledContainer>;

const StyledContainer = styled(Container)`
margin-bottom: 8em;
`;

const DayTime = styled.p`
  font-size: 1.4em;
`;
const Dot = styled.div`
  width: 6px;
    height: 6px;
    margin: auto;
    border-radius: 50%;
    background-color: black;
    margin-bottom: 0.6em;
`;

export default LPDTimeline;