//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import MentorList from '../common/MentorList'
import {Container} from 'reactstrap'

type Props = {}

class MentorPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
          <Container>
              <h1>MENTORS</h1>
              <MentorList className="mt-5" noChallengeMentors/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MentorPage);