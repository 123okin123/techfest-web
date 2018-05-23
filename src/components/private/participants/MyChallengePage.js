//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import CreateTeam from './CreateTeam'

type Props = {}

class MyChallengePage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
          <div>
              <CreateTeam/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyChallengePage);