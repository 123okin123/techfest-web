import React from 'react'
import styled from "styled-components";
import {Bracket} from "../common";
import {Container, Col, Row} from 'reactstrap'

const LPDTeaser = (props) =>
  <StyledContainer>
      {/*<Row className="justify-content-center">*/}
          {/*<Col md={10}>*/}
      {/*<FlexContainer>*/}
          {/*<Bracket/>*/}
          {/*<HeaderTitle>UnternehmerTUM LAUNCHPAD DAY</HeaderTitle>*/}
          {/*<Bracket right/>*/}
      {/*</FlexContainer>*/}
      {/*<p className="mb-5 text-center">This year, for the first time, most promising teams get the chance to join UnternehmerTUM Launchpad Day.</p>*/}
          {/*</Col>*/}
      {/*</Row>*/}
      {/*<Row className="mb-5">*/}
          {/*<Col md={4} className="text-center mb-5"><img src={require('../../assets/icons/icon_launchpad-rocket_black-white.png')}/></Col>*/}
          {/*<Col md={8}>*/}
              {/*<ul className="list-style-x">*/}
                  {/*<li>Exploit the full potential of your ground-breaking new ideas</li>*/}
                  {/*<li>Turn TECHFEST projects into tech businesses</li>*/}
                  {/*<li>Establish long-term partnerships</li>*/}
                  {/*<li>Let exciting TECHFEST end in a relaxing atmosphere by the lake</li>*/}
              {/*</ul>*/}
          {/*</Col>*/}
      {/*</Row>*/}
      <DescriptionBox>
          <Bracket/>
          <DescriptionContent>
              <DescriptionHead>[MORE_IMPACT]</DescriptionHead>
              <DescriptionText>
                  AT UNTERNEHMERTUM LAUNCHPAD DAY INVITED TECHFEST TEAMS & PARTNERS GET THE CHANCE TO LIFT TECHFEST IDEAS TO THE NEXT LEVEL AND LAY THE GROUNDWORK FOR STRONG PARTNERSHIPS.
                  START TO CREATE FUTURE TECH BUSINESSES TOGETHER SUPPORTED BY UNTERNEHMERTUM COACHES. #CREATETHEWORLDYOUWANTTOLIVEIN!
              </DescriptionText>
          </DescriptionContent>
          <Bracket right/>
      </DescriptionBox>
</StyledContainer>;


const StyledContainer = styled(Container)`
margin-bottom: 8em;
`;

const HeaderTitle = styled.h2`
  //font-size: 3em;
  //font-weight: 900;
  text-align: center;
  margin: 0 20px;
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;
const DescriptionBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5em;
  margin-top: 8em;
`;
const DescriptionContent = styled.div`
  padding: 20px;
  text-align: center;
`;
const DescriptionHead = styled.p`
  color: ${props => props.theme.primary};
  font-weight: 600;
  margin-bottom: 0;
`;
const DescriptionText = styled.p`
  color: ${props => props.theme.primary};
  font-size: 0.9em;
  line-height: 2em;
`;


export default LPDTeaser;