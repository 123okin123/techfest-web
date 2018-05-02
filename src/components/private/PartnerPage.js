//@flow

import * as React from 'react';
import {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import {connect} from "react-redux";
import AddJob from './AddJob';
import JobList from './JobList';
import {userActions} from "../../actions";
import {type User} from "../../constants/userConstants";

type Props = {
    +fetchInfo: ()=>Promise<void>,
    +userData: User
}

class PartnerPage extends Component<Props> {

    componentDidMount() {
        this.props.fetchInfo()
    }

    render() {
        const company = (this.props.userData.partnerFields || {}).company;
        return (
          <Container className="pt-5">
              <h1>PARTNER AREA</h1>
              <h2 className="mb-5">Welcome {this.props.userData.firstName} {company && <span>{'(' + company + ')'}</span>}</h2>
              <Row>
                  <Col md="6">
                      <h4>Add Job</h4>
                      <AddJob className="mb-5"/>
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <h4>Published Jobs</h4>
                      <JobList showJobsOfCompany={company} editable/>
                  </Col>
              </Row>
          </Container>
        )}
}


const mapStateToProps = (state, ownProps) => {
    const {data} = state.user;
    return {userData: (data || {})}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchInfo: () => {
            return dispatch(userActions.getInfo())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerPage);