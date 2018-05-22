//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {roles} from "../../../../constants/index";
import {Row, Container, Col} from 'reactstrap';
import JobList from '../../common/JobList';
import AddJob from './AddJob';
import {userActions} from "../../../../actions/index";
import {pageActions} from "../../../../actions";
import styled from "styled-components";
import {ScaleLoader} from 'react-spinners';


type Props = {
    userData: {
        role?: string,
        partnerFields?: {company?: string}
    },
    fetchInfoIfNeeded: ()=>Promise<void>,
    fetchPageIfNeeded: ()=>Promise<void>,
    isFetchingPage?: boolean,
    response?: {content?: {rendered?: string}}
}

class PostJobPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchInfoIfNeeded();
        this.props.fetchPageIfNeeded();
    }

    render() {
        const company = (this.props.userData.partnerFields || {}).company;
        return (
          <Container>
              {((this.props.userData.role === roles.TRACK_PARTNER_ROLE) ||
                (this.props.userData.role === roles.ADMIN_ROLE)) &&
              <div>
                  <h1>POST JOB</h1>
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
                          <AddJob/>
                      </Col>
                  </Row>

                  <Row className="mb-5">
                      <Col>
                          <h2>Published Jobs</h2>
                          <JobList showJobsOfCompany={company} editable/>
                      </Col>
                  </Row>
              </div>
              }
          </Container>
        )
    }
}

const LoaderContainer = styled.div`
  margin: auto;
  text-align: center;
  width: 100px;
`;

const mapStateToProps = (state, ownProps) => {
    const {data} = state.user;
    const {response, isFetching} = state.pages['3061'] || {response: {content: {rendered: ''}}, isFetching: true};
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
            return dispatch(pageActions.fetchPageIfNeeded('3061'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostJobPage);