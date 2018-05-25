import React from 'react'
import styled from 'styled-components'
import {Row, Col, Container} from 'reactstrap'

const LPDHowToParticipate = (props) =>
  <StyledContainer>
      <Container>
          <h2 className="mb-5">HOW TO PARTICIPAT</h2>
      </Container>
  <StyledRow className="mx-0">
      <Col className="px-0 text-center pt-3">
          <span className="border-light border p-2">TECHFEST</span>
          <FlexContainer className="mt-3">
          <ArrowLeft/>
          <Box>Create the unthinkable and show your entrepreneurial spirit</Box>
          <ArrowRight/>
          </FlexContainer>
      </Col>
      <Col className="px-0 text-center pt-3">
          <span className="border-light border p-2">FINAL PITCHES</span>
          <FlexContainer className="mt-3">
          <ArrowLeft/>
          <Box>Convince  partners of your ideas & potential for future business</Box>
          <ArrowRight/>
          </FlexContainer>
      </Col>
      <Col className="px-0 text-center pt-3">
          <span className="border-light border p-2">SELECTION</span>
          <FlexContainer className="mt-3">
          <ArrowLeft/>
          <Box>Selected teams announced on Sunday, June 17th</Box>
          <ArrowRight/>
          </FlexContainer>
      </Col>
      <Col className="px-0 text-center pt-3">
          <span className="border-light border p-2">EVENT</span>
          <FlexContainer className="mt-3">
          <ArrowLeft/>
          <Box>UnternehmerTUM Launchpad Day on June, 18th</Box>
          <ArrowRight/>
          </FlexContainer>
      </Col>
  </StyledRow>
  </StyledContainer>
;

const StyledContainer = styled.div`
margin-bottom: 8em;
`;

const StyledRow = styled(Row)`
  overflow: scroll;
  flex-wrap: nowrap !important;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  background-color: black;
  color: ${(props)=> props.theme.background};
  padding: 1em;
  width: 200px;
  height: 100px;
`;
const ArrowRight = styled.div`
  border-bottom: 50px solid transparent;
  border-top: 50px solid transparent;
  border-left: 50px solid black;
`;
const ArrowLeft = styled.div`
  border-bottom: 50px solid black;
  border-top: 50px solid black;
  border-left: 50px solid transparent; 
`;


export default LPDHowToParticipate;