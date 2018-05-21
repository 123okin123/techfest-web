//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import LPDHeader from './LPDHeader'
import LPDTeaser from './LPDTeaser'
import LPDLocation from './LPDLocation'

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