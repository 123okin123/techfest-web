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
  <StyledRow className="mx-0">
      <Col xs={12} lg={3} className="px-0 text-center pt-3">
          <span  className="p-2"><strong>TEAM REGISTRATION</strong></span>
          <FlexContainer className="mt-3">
          <ArrowLeft/>
              <Box><strong className="align-baseline">REGISTER YOUR TEAM FOR LAUNCHPAD DAY ON FRIDAY, JUNE 15TH</strong></Box>
          <ArrowRight style={{marginRight: '-30px'}}/>
          </FlexContainer>
      </Col>
      <Col xs={12} lg={3} className="px-0 text-center pt-3">
          <span className="p-2"><strong>TECHFEST PERFORMANCE</strong></span>
          <FlexContainer className="mt-3">
          <ArrowLeft/>
              <Box className="pt-4"><strong className="align-baseline">CONVINCE PARTNERS OF YOU & YOUR IDEA’S IMPACT</strong></Box>
          <ArrowRight style={{marginRight: '-30px'}}/>
          </FlexContainer>
      </Col>
      <Col xs={12} lg={3} className="px-0 text-center pt-3">
          <span  className="p-2"><strong>INVITATIONS</strong></span>
          <FlexContainer className="mt-3">
          <ArrowLeft/>
              <Box className="pt-4"><strong className="align-baseline">SELECTED TEAMS ANNOUNCED ON SUNDAY, JUNE 17TH</strong></Box>
          <ArrowRight style={{marginRight: '-30px'}}/>
          </FlexContainer>
      </Col>
      <Col xs={12} lg={3} className="text-center pt-3">
          <StyledImg src={require('../../assets/icons/icon_launchpad-rocket_black-white.png')}/>
          <p><strong>UNTERNEHMERTUM LAUNCHPAD DAY ON JUNE, 18TH</strong></p>
      </Col>
  </StyledRow>
      </Container>
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
  padding: 0.6em;
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