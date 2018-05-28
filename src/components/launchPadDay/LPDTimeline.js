import React from 'react'
import {Container, Row, Col, Table} from 'reactstrap'
import styled from 'styled-components'
import {Heading} from '../common'

const LPDTimeline = (props) =>
  <StyledContainer>
      <Heading title="AGENDA LAUNCHPAD DAY 2018" subtitle="A DAY TO START FUTURE TECH BUSINESS TOGETHER" className="mb-5"/>
      <Row className="justify-content-center">
          <Col md={10}>
      <StyledTable className="text-center table-responsive-lg">
          <thead>
          <tr>
              <TimelineHead scope="col">MORNING</TimelineHead>
              <TimelineHead scope="col">LUNCHTIME</TimelineHead>
              <TimelineHead scope="col">AFTERNOON</TimelineHead>
          </tr>
          </thead>
          <tbody>
          <tr className="border-bottom border-dark">
              <td>KEYNOTES FROM BÜLENT ALTAN</td>
              <td>BARBECUE</td>
              <td>COMMITMENTS</td>
          </tr>
          <tr className="border-bottom border-dark">
              <td>OFFERINGS & GOALS</td>
              <td>NETWORKING</td>
              <td>OUTLOOK</td>
          </tr>
          <tr className="border-bottom border-dark">
              <td>GET TO KNOW EACH OTHER</td>
              <td>COOPERATION & BUSINESS POSSIBILITIES</td>
              <td>ENJOY LAKE WÖRTHSEE</td>
          </tr>
          </tbody>
      </StyledTable>
          </Col>
      </Row>

  </StyledContainer>;

const StyledContainer = styled(Container)`
margin-bottom: 8em;
`;

const TimelineHead = styled.th`
font-weight: 900;
font-size: 1.8em;
border: none !important;
`;
const StyledTable = styled(Table)`
 > tbody > tr > td {
 border: none;
 font-weight: 700;
 width: 200px;
}
`;


export default LPDTimeline;