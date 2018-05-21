import React from 'react'
import {Container} from 'reactstrap'
import styled from 'styled-components'
import {Bracket} from "../common";

const LPDLocation = (props) =>
  <StyledContainer>
      <h2 className="mb-5">EXCLUSIVE LOCATION AT LAKE WÖRTHSEE</h2>
      <StyledActivities>[ MORE_FUN ] </StyledActivities>
      <StyledActivities>[ BARBECUE / PEDAL& ROWING BOATS / VOLLEYBALL / TRAMPOLINE / PING-PONG / SWIM ]</StyledActivities>
      <div className="d-flex text-center my-5 justify-content-center">
      <Bracket/>
      <div className="w-75">
          <StyledActivities>[MORE_IMPACT]</StyledActivities>
          <p>FUTURE TECH BUSINESSES / STRONG PARTNERSHIPS / INDUSTRY INSIGHTS / FIRM COMMITMENTS / UNTERNEHMERTUM SUPPORT
              MAKERSPACE PROTOTYPING / GRANTS / INCUBATION PROGRAMS / AND MUCH MORE_</p>
          <p className="mb-0">#CREATETHEUNTHINKABLE</p>
          <p>#TECHFESTMUNICH_LPD</p>
      </div>
      <Bracket right/>
      </div>
  </StyledContainer>;

const StyledContainer = styled(Container)`
margin-bottom: 8em;
`;


const StyledActivities = styled.p`
    font-size: 1.4em;
    margin-bottom: 0;
    text-align: center;
`;

export default LPDLocation