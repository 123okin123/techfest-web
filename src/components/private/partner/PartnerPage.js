//@flow

import * as React from 'react';
import {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import {connect} from "react-redux";
import {userActions, pageActions} from "../../../actions/index";
import {type User, roles} from "../../../constants";
import styled from "styled-components";
import {ScaleLoader} from 'react-spinners';
import {FileUpload, type Upload} from "../../common";


type Props = {
    +fetchInfoIfNeeded: ()=>Promise<void>,
    +fetchPageIfNeeded: ()=>Promise<void>,
    +userData: User,
    +isFetchingPage?: boolean,
    +response?: {
        content?: {
            rendered?: string
        },
        acf?: {
            briefing_uploads?: Array<Upload>,
            media_day_1?: Array<Upload>,
            media_day_2?: Array<Upload>,
            media_day_3?: Array<Upload>,
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
          <Container>
              <h1>PARTNER AREA</h1>
              <h2 className="mb-5">Welcome {this.props.userData.firstName} {company && <span>{'[' + company + ']'}</span>}</h2>
              <Row>
                  <Col md="12">
                      {this.props.isFetchingPage &&
                        <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>
                      }
                      {this.props.response && this.props.response.content &&
                        <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>
                      }
                  </Col>
              </Row>

              <Row className="mb-5">
                  <Col>
                      <h3>TECHFEST Briefings</h3>
                      <div className="d-flex flex-wrap justify-content-center">
                          {Array.isArray(((this.props.response || {}).acf || {}).briefing_uploads) &&
                              (((this.props.response || {}).acf || {}).briefing_uploads || []).map((upload, index)=>
                                <FileUpload width='300px' key={index.toString()} upload={upload}/>
                          )}
                      </div>
                  </Col>
              </Row>
              {(this.props.userData.role === roles.TRACK_PARTNER_ROLE || this.props.userData.role === roles.ADMIN_ROLE) &&
              <Row>
                  <Col md={4}>
                      <h3>TECHFEST 2018 Media - day 1</h3>
                      <div className="d-flex flex-wrap">
                          {Array.isArray(((this.props.response || {}).acf || {}).media_day_1) &&
                          (((this.props.response || {}).acf || {}).media_day_1 || []).map((upload, index) =>
                            <FileUpload key={index.toString()} upload={upload}/>
                          )}
                      </div>
                  </Col>
                  <Col md={4}>
                      <h3>TECHFEST 2018 Media - day 2</h3>
                      <div className="d-flex flex-wrap">
                          {Array.isArray(((this.props.response || {}).acf || {}).media_day_2) &&
                          (((this.props.response || {}).acf || {}).media_day_2 || []).map((upload, index) =>
                            <FileUpload key={index.toString()} upload={upload}/>
                          )}
                      </div>
                  </Col>
                  <Col md={4}>
                      <h3>TECHFEST 2018 Media - day 3</h3>
                      <div className="d-flex flex-wrap">
                          {Array.isArray(((this.props.response || {}).acf || {}).media_day_3) &&
                          (((this.props.response || {}).acf || {}).media_day_3 || []).map((upload, index) =>
                            <FileUpload key={index.toString()} upload={upload}/>
                          )}
                      </div>
                  </Col>
              </Row>
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