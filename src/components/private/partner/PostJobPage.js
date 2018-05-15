//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {roles} from "../../../constants";
import {Row, Container, Col} from 'reactstrap';
import JobList from '../common/JobList';
import AddJob from './AddJob';
import {userActions} from "../../../actions";
import type {User} from "../../../constants";

type Props = {
    +fetchInfoIfNeeded: ()=>Promise<void>,
    +userData: User,
}

class PostJobPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchInfoIfNeeded();
    }

    render() {
        const company = (this.props.userData.partnerFields || {}).company;
        return (
          <Container>
              {((this.props.userData.role === roles.TRACK_PARTNER_ROLE) ||
                (this.props.userData.role === roles.ADMIN_ROLE)) &&
              <div>
                  <Row className="mb-5">
                      <Col md="6">
                          <h3>Post Job</h3>
                          <AddJob/>
                      </Col>
                  </Row>

                  <Row className="mb-5">
                      <Col>
                          <h4>Published Jobs</h4>
                          <JobList showJobsOfCompany={company} editable/>
                      </Col>
                  </Row>
              </div>
              }
          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {data} = state.user;
    return {
        userData: (data || {})
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchInfoIfNeeded: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostJobPage);