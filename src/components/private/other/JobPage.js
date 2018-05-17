//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import JobList from '../common/JobList';
import {Container} from 'reactstrap';

type Props = {}

class Template extends Component<Props> {

    render() {
        return (
          <Container>
              <h1>AVAILABLE JOBS</h1>
              <JobList/>
          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);