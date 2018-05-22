//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap';
import AddLaunchPadGuest from './AddLaunchPadGuest'
import LaunchPadGuestList from './LaunchPadGuestList'
import {pageActions, userActions} from "../../../../actions";
import styled from "styled-components";
import {ScaleLoader} from 'react-spinners';

type Props = {
    userData: {},
    fetchInfoIfNeeded: ()=>Promise<void>,
    fetchPageIfNeeded: ()=>Promise<void>,
    isFetchingPage?: boolean,
    response?: {content?: {rendered?: string}}
}

class LPDGuestRegistrationPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchInfoIfNeeded();
        this.props.fetchPageIfNeeded()
    }

    render() {
        return (
          <Container>
              <Row className="mb-5">
                  <Col md="6">
                      <h1 className="mt-md-5 pt-md-5 mb-5">LAUNCHPAD DAY GUESTS REGISTRATION</h1>
                      {this.props.isFetchingPage &&
                      <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>
                      }
                      {this.props.response && this.props.response.content &&
                      <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>
                      }
                  </Col>
                  <Col md={6}>
                      <AddLaunchPadGuest/>
                  </Col>
              </Row>
              <Row className="mb-5">
                  <Col>
                      <h2>Registered Launchpad Day Guests</h2>
                      <LaunchPadGuestList/>
                  </Col>
              </Row>
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
    const {response, isFetching} = state.pages['3041'] || {response: {content: {rendered: ''}}, isFetching: true};
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
            return dispatch(pageActions.fetchPageIfNeeded('3041'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LPDGuestRegistrationPage);