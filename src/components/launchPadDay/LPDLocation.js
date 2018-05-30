import React from 'react'
import {Container} from 'reactstrap'
import styled from 'styled-components'
import {Heading} from '../common'

const LPDLocation = (props) =>
  <StyledContainer>
      <Heading title="EXCLUSIVE EVENT AT LAKE WÖRTHSEE" subtitle="WHERE TECHFEST IDEAS TURN INTO FUTURE TECH BUSINESSES"/>
      <img className="w-100" src={require('../../assets/lpd_location.jpg')} alt="lpd_location"/>
      <div className="text-center mt-4">
      <p className="mt-5 text-center d-inline mr-2">ORGANZIED IN COOPERATION WITH OUR UNTERNEHMERTUM LAUNCHPAD DAY PARTNER TQ SYSTEMS</p>
      <img height="50px" src={require('../../assets/TQ_Logo_Blau_RGB_Rev100.png')}/>
      </div>
  </StyledContainer>;

const StyledContainer = styled(Container)`
margin-bottom: 8em;
`;

export default LPDLocation