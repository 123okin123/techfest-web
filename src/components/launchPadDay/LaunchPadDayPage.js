//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import LPDHeader from './LPDHeader'
import LPDTeaser from './LPDTeaser'
import LPDLocation from './LPDLocation'
import LPDHowToParticipate from './LPDHowToParticipate'
import LPDTimeline from './LPDTimeline'
import LPDUSP from './LPDUSP'
import LPDIncubation from './LPDIncubation'
import VideoContainer from '../common/VideoContainer'
import styled from "styled-components";
import {ImageGrid} from '../common/ImageGrid'
import {Container} from 'reactstrap'
import ShowcaseContainer from './ShowcaseContainer'


type Props = {}

const logos = [{
    imageURL: require('../../assets/partnerLogos/logo_audi.png'),
},{
    imageURL: require('../../assets/partnerLogos/logo_stihl.png'),
},{
    imageURL: require('../../assets/partnerLogos/logo_lh.png'),
}];

class LaunchPadDayPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
          <div style={{marginTop: '-5em'}}>
              <LPDHeader/>
              <LPDTeaser/>
              <VideoContainer videoURL={'https://s3.eu-central-1.amazonaws.com/techfest-wp-admin/TF+++LAUNCHPERDAY_master_4.mp4'}/>
              <LPDLocation/>
              <LPDUSP/>
              <LPDIncubation/>
              {/*<LPDHowToParticipate/>*/}
              {/*<LPDTimeline/>*/}
              <Container><h2 className="mb-5">OFFICIAL TECHFEST AGILE INCUBATION PARTNERS</h2></Container>
              <LogoContainer>
                  <ImageGrid containImage leftRightInset="0px" imageWidth={'100%'} elementWidth={'300px'} elementHeight={'120px'} elementMargin={'20px 10px'} elements={logos}/>
              </LogoContainer>
                  <Container>
                      <ShowcaseContainer/>
                  </Container>
          </div>
        )
    }
}

const LogoContainer = styled.div`
  background-color: white;
  margin-bottom: 8em;
`;

const mapStateToProps = (state, ownProps) => {
    return {}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchPadDayPage);