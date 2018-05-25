//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap';
import AddAdvisor from './AddAdvisor';
import AdvisorList from './AdvisorList';

type Props = {}

class AdvisorPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
          <Container>
              <Row className="mb-5">
                  <Col>
                      <h3>Advisor Registration</h3>
                      <AddAdvisor/>
                  </Col>
              </Row>
              <Row className="mb-5">
                  <Col>
                      <h4>Advisors</h4>
                      <AdvisorList/>
                  </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdvisorPage);