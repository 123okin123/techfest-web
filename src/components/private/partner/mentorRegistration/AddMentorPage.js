//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap'
import AddMentor from './AddMentor'
import {mentorActions, userActions, pageActions} from "../../../../actions/index";
import MentorList from '../../common/MentorList'
import {type User, type Mentor} from '../../../../constants/index'
import {LoaderContainer} from "../../../common";
import {ScaleLoader} from 'react-spinners';



type Props = {
    userData: User,
    mentors: Array<Mentor>,
    fetchInfoIfNeeded: ()=>Promise<void>,
    fetchMentorsIfNeeded: ()=>Promise<void>,
    fetchPageIfNeeded: ()=>Promise<void>,
    isFetchingPage?: boolean,
    response?: {content?: {rendered?: string}}
}


class AddMentorPage extends Component<Props> {
    constructor(props: Props) {
        super(props);
        (this: any).isAllowedToAdd = this.isAllowedToAdd.bind(this);
    }
    componentDidMount() {
        this.props.fetchInfoIfNeeded();
        this.props.fetchMentorsIfNeeded();
        this.props.fetchPageIfNeeded();
    }

    isAllowedToAdd(): boolean {
        const company = (this.props.userData.partnerFields || {}).company;
        const numberOfMentors = this.props.mentors.filter((e)=>e.company === company).length;
        const allowedNumber = (this.props.userData.partnerFields || {}).numberOfMentorsAllowed || 0;
        return (numberOfMentors < allowedNumber)
    }

    render() {
        return (
          <Container>
              <Row>
                  <Col md={6}>
                      <h1 className="mt-md-5 pt-md-5">REGISTER YOUR MENTORS</h1>
                      <h2 className="mb-5">Add up to {(this.props.userData.partnerFields || {}).numberOfMentorsAllowed || 0} Mentors here.</h2>
                      {this.props.isFetchingPage &&
                      <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>
                      }
                      {this.props.response && this.props.response.content &&
                      <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>
                      }
                  </Col>
                  <Col md={6} className="text-center">
                      <AddMentor allowedToAdd={this.isAllowedToAdd()} userData={this.props.userData}/>
                  </Col>
              </Row>
              <h2 className="mt-5">Your Mentors</h2>
              <MentorList className="mt-5" companyFilter={(this.props.userData.partnerFields || {}).company}/>
          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {data} = state.user;
    const {items} = state.mentors;
    const {response, isFetching} = state.pages['3081'] || {response: {content: {rendered: ''}}, isFetching: true};
    return {
        userData: (data || {}),
        mentors: items || [],
        isFetchingPage: isFetching,
        response
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchInfoIfNeeded: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        fetchMentorsIfNeeded: () => {
            return dispatch(mentorActions.fetchMentorsIfNeeded())
        },
        fetchPageIfNeeded: () => {
            return dispatch(pageActions.fetchPageIfNeeded("3081"))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMentorPage);