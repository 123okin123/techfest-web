//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap'
import AddMentor from './AddMentor'

type Props = {}

class AddMentorPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
          <Container>
                <AddMentor/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddMentorPage);