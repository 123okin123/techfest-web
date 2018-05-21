//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap'
import AddMentor from './AddMentor'
import {mentorActions, userActions} from "../../../actions";
import MentorList from './MentorList'
import {type User, type Mentor} from '../../../constants'

type Props = {
    userData: User,
    mentors: Array<Mentor>,
    fetchInfoIfNeeded: ()=>Promise<void>,
    fetchMentorsIfNeeded: ()=>Promise<void>,
}


class AddMentorPage extends Component<Props> {
    constructor(props: Props) {
        super(props);
        (this: any).isAllowedToAdd = this.isAllowedToAdd.bind(this);
    }
    componentDidMount() {
        this.props.fetchInfoIfNeeded();
        this.props.fetchMentorsIfNeeded()
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
                      <h2>Add up to {(this.props.userData.partnerFields || {}).numberOfMentorsAllowed || 0} Mentors here.</h2>
                  </Col>
                  <Col md={6} className="text-center">
                      <AddMentor allowedToAdd={this.isAllowedToAdd()} userData={this.props.userData}/>
                  </Col>
              </Row>
              <h2 className="mt-5">Your Mentors</h2>
              <MentorList className="mt-5" userData={this.props.userData}/>
          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {data} = state.user;
    const {items} = state.mentors;
    return {
        userData: (data || {}),
        mentors: items || []
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMentorPage);