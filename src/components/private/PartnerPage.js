//@flow


import React, {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import {connect} from "react-redux";


class PartnerPage extends Component<{}> {

    render() {
        return (
          <Container className="pt-5">
              <h1>PARTNER AREA</h1>
              <Row>
                  <Col>
                  </Col>
              </Row>
          </Container>
        )}
}


const mapStateToProps = (state, ownProps) => {
    return {}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerPage);