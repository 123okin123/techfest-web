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

type Props = {}

class LaunchPadDayPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
          <div style={{marginTop: '-5em'}}>
              <LPDHeader/>
              <LPDTeaser/>
              <VideoContainer videoURL={'https://s3.eu-central-1.amazonaws.com/techfest-wp-admin/TF+++LAUNCHPERDAY_master_3.mp4'}/>
              <LPDLocation/>
              <LPDUSP/>
              <LPDIncubation/>
              {/*<LPDHowToParticipate/>*/}
              {/*<LPDTimeline/>*/}
          </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchPadDayPage);