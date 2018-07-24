import React from 'react'
import {Container} from 'reactstrap'
import styled from 'styled-components'
import {Heading} from '../common'
import ImageGallery from 'react-image-gallery';


let images = [];
for (let i = 0; i<11; i++) {
    images.push({
        original: require(`../../assets/images/lpdGallery/lpd-${i}.jpg`),
        thumbnail: require(`../../assets/images/lpdGallery/lpd_thumb-${i}.jpg`)
    })
}


const LPDLocation = (props) =>
  <StyledWrapper>
  <Container>
      <Heading title="EXCLUSIVE EVENT AT LAKE WÖRTHSEE" subtitle="WHERE TECHFEST IDEAS TURN INTO FUTURE TECH BUSINESSES"/>
      {/*<img className="w-100" src={require('../../assets/lpd_location.jpg')} alt="lpd_location"/>*/}
      {/*<div className="text-center mt-4">*/}
      {/*<p className="mt-5 text-center d-inline mr-2">ORGANZIED IN COOPERATION WITH OUR UNTERNEHMERTUM LAUNCHPAD DAY PARTNER TQ SYSTEMS</p>*/}
      {/*<img height="50px" src={require('../../assets/TQ_Logo_Blau_RGB_Rev100.png')}/>*/}
      {/*</div>*/}

      <ImageGallery items={images}/>
  </Container>
  </StyledWrapper>;

const StyledWrapper = styled.div`
margin: 8em 0;
`;

export default LPDLocation