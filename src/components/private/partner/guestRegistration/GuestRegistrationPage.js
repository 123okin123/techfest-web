//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap'
import AddGuest from './AddGuest'
import GuestList from './GuestList'
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

class GuestRegistrationPage extends Component<Props> {
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
              <h1>GUEST REGISTRATION</h1>
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
                      <AddGuest/>
                  </Col>
              </Row>
              <Row className="mb-5">
                  <Col>
                      <h2>Registered Guests</h2>
                      <GuestList/>
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
    const {response, isFetching} = state.pages['3011'] || {response: {content: {rendered: ''}}, isFetching: true};
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
            return dispatch(pageActions.fetchPageIfNeeded('3011'))
        }
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(GuestRegistrationPage);