//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import LPDHeader from './LPDHeader'
import LPDTeaser from './LPDTeaser'
import LPDLocation from './LPDLocation'
import LPDHowToParticipate from './LPDHowToParticipate'
import LPDTimeline from './LPDTimeline'
import LPDDirections from './LPDDirections'

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
              <LPDLocation/>
              <LPDHowToParticipate/>
              <LPDTimeline/>
              <LPDDirections/>
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