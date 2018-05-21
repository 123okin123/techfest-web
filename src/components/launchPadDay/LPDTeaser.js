import React from 'react'
import styled from "styled-components";
import {Bracket} from "../common";
import {Container, Col, Row} from 'reactstrap'

const LPDTeaser = (props) =>
  <Container>
      <FlexContainer>
          <Bracket/>
          <HeaderTitle>UnternehmerTUM LAUNCHPAD DAY</HeaderTitle>
          <Bracket right/>
      </FlexContainer>
      <p>This year, for the first time, most promising teams get the chance to join UnternehmerTUM Launchpad Day.</p>
      <Row>
          <Col md={6}><img src=""/></Col>
          <Col md={6}>
              <ul className="list-style-x">
                  <li>Exploit the full potential of your ground-breaking new ideas</li>
                  <li>Turn TECHFEST projects into tech businesses</li>
                  <li>Establish long-term partnerships</li>
                  <li>Let exciting TECHFEST end in a relaxing atmosphere by the lake</li>
              </ul>
          </Col>
      </Row>
</Container>;

const HeaderTitle = styled.h2`
  font-size: 3em;
  font-weight: 900;
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;


export default LPDTeaser;