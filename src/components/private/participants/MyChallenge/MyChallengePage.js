//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import CreateTeam from './CreateTeam'
import {Container, Row, Col} from 'reactstrap';

type Props = {}

class MyChallengePage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
          <Container>
              <Row className="justify-content-center">
                  <Col xs={12} md={6}><CreateTeam/></Col>
              </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyChallengePage);