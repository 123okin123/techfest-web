//@flow


import React, {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import {connect} from "react-redux";
import AddJob from './AddJob';
import JobList from './JobList';

class PartnerPage extends Component<{}> {


    render() {
        return (
          <Container className="pt-5">
              <h1>PARTNER AREA</h1>
              <Row>
                  <Col md="6">
                      <h4>Add Job</h4>
                      <AddJob className="mb-5"/>
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <h4>Published Jobs</h4>
                      <JobList editable/>
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