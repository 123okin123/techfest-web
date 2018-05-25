import React from 'react'
import {Container} from 'reactstrap'
import styled from 'styled-components'
import {Bracket} from "../common";
import {Heading} from '../common'

const LPDLocation = (props) =>
  <StyledContainer>
      <Heading title="EXCLUSIVE EVENT AT LAKE WÖRTHSEE" subtitle="WHERE TECHFEST IDEAS TURN INTO FUTURE TECH BUSINESSES"/>
      <p>ORGANZIED IN COOPERATION WITH OUR UNTERNEHMERTUM LAUNCHPAD DAY PARTNER TQ SYSTEMS</p>
  </StyledContainer>;

const StyledContainer = styled(Container)`
margin-bottom: 8em;
`;

export default LPDLocation