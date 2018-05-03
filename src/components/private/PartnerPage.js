//@flow

import * as React from 'react';
import {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import {connect} from "react-redux";
import AddJob from './AddJob';
import JobList from './JobList';
import {userActions, pageActions} from "../../actions";
import {type User, roles} from "../../constants";
import AddGuest from './AddGuest';
import GuestList from './GuestList';
import styled from "styled-components";
import {ScaleLoader} from 'react-spinners';


type Props = {
    +fetchInfoIfNeeded: ()=>Promise<void>,
    +fetchPageIfNeeded: ()=>Promise<void>,
    +userData: User,
    +isFetchingPage?: boolean,
    +response?: {
        content?: {
            rendered?: string
        }
    }
}

class PartnerPage extends Component<Props> {

    componentDidMount() {
        this.props.fetchInfoIfNeeded();
        this.props.fetchPageIfNeeded()
    }

    render() {
        const company = (this.props.userData.partnerFields || {}).company;
        return (
          <Container className="pt-5">
              <h1>PARTNER AREA</h1>
              <h2 className="mb-5">Welcome {this.props.userData.firstName} {company && <span>{'(' + company + ')'}</span>}</h2>

              <Row className="mb-5">
                  <Col md="6">
                      {this.props.isFetchingPage &&
                        <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>
                      }
                      {this.props.response && this.props.response.content &&
                        <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>
                      }
                  </Col>
              </Row>

              <Row className="mb-5">
                  <Col md="6">
                      <h3>Guest Registration</h3>
                      <AddGuest/>
                  </Col>
              </Row>

              <Row className="mb-5">
                  <Col>
                      <h4>Registered Guests</h4>
                      <GuestList/>
                  </Col>
              </Row>
              {((this.props.userData.role === roles.TRACK_PARTNER_ROLE) ||
                (this.props.userData.role === roles.ADMIN_ROLE) ||
              (this.props.userData.partnerFields && this.props.userData.partnerFields.company === "Stihl")) &&
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
        )}
}

const LoaderContainer = styled.div`
  margin: auto;
  text-align: center;
  width: 100px;
`;

const mapStateToProps = (state, ownProps) => {
    const {data} = state.user;
    const {response, isFetching} = state.pages['2361'] || {response: {content: {rendered: ''}}, isFetching: true};
    return {
        userData: (data || {}),
        response,
        isFetchingPage: isFetching
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchInfoIfNeeded: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        fetchPageIfNeeded: () => {
            return dispatch(pageActions.fetchPageIfNeeded('2361'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerPage);