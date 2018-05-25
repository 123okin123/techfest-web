import React from 'react'
import styled from 'styled-components'
import {Row, Col, Container} from 'reactstrap'
import {Heading} from '../common'

const LPDHowToParticipate = (props) =>
  <StyledContainer>
      <Container>
          <Heading title="YOUR WAY TO LAUNCHPAD DAY" subtitle="HOW HACKATHON TEAMS AND START-UP TEAMS CAN JOIN" className="mb-5">HOW TO PARTICIPAT</Heading>
      <p className="mb-5">TRACK & CHALLENGE PARTNERS AND UNTERNEHMERTUM INVITE MOST PROMISING
          TEAMS AND START-UPS TO LAUNCHPAD DAY - SO HACK AS HARD AS YOU CAN AND STAND OUT BY CREATING THE UNTHINKABLE!
      </p>
      </Container>
  <StyledRow className="mx-0">
      <Col xs={12} lg={3} className="px-0 text-center pt-3">
          <span className="p-2">TEAM REGISTRATION</span>
          <FlexContainer className="mt-3">
          <ArrowLeft/>
          <Box>REGISTER YOUR TEAM FOR LAUNCHPAD DAY ON FRIDAY, JUNE 15TH</Box>
          <ArrowRight/>
          </FlexContainer>
      </Col>
      <Col xs={12} lg={3} className="px-0 text-center pt-3">
          <span className="p-2">TECHFEST PERFORMANCE</span>
          <FlexContainer className="mt-3">
          <ArrowLeft/>
          <Box>CONVINCE PARTNERS OF YOU & YOUR IDEA’S IMPACT</Box>
          <ArrowRight/>
          </FlexContainer>
      </Col>
      <Col xs={12} lg={3} className="px-0 text-center pt-3">
          <span className="p-2">INVITATIONS</span>
          <FlexContainer className="mt-3">
          <ArrowLeft/>
          <Box>SELECTED TEAMS ANNOUNCED ON SUNDAY, JUNE 17TH</Box>
          <ArrowRight/>
          </FlexContainer>
      </Col>
      <Col xs={12} lg={3} className="text-center pt-3">
          <StyledImg src={require('../../assets/icons/icon_launchpad-rocket_black-white.png')}/>
          <p>UNTERNEHMERTUM LAUNCHPAD DAY ON JUNE, 18TH</p>
      </Col>
  </StyledRow>
  </StyledContainer>
;

const StyledContainer = styled.div`
margin-bottom: 8em;
`;
const StyledImg = styled.img`
    height: 70px;
    margin-bottom: 10px;
`;
const StyledRow = styled(Row)`

`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  background-color: black;
  color: ${(props)=> props.theme.background};
  padding: 0.8em;
  width: 200px;
  height: 120px;
`;
const ArrowRight = styled.div`
  border-bottom: 60px solid transparent;
  border-top: 60px solid transparent;
  border-left: 60px solid black;
`;
const ArrowLeft = styled.div`
  border-bottom: 60px solid black;
  border-top: 60px solid black;
  border-left: 60px solid transparent; 
`;


export default LPDHowToParticipate;