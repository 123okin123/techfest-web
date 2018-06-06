//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import CreateTeam from './CreateTeam'
import {Container, Row, Col} from 'reactstrap';
import type {Challenge, Team} from "../../../../constants";
import {challengeActions, pageActions, userActions} from "../../../../actions";
import {LoaderContainer} from "../../../common";
import {ScaleLoader} from 'react-spinners';
import MentorList from '../../common/MentorList';
import Card from '../../common/Card';
import TeamUpload from "./TeamUpload";

type Props = {
    getChallenge: ()=>Promise<Challenge>,
    challenge: ?Challenge,

    team?: Team,

    getInfo: ()=>Promise<void>,


    fetchPageIfNeeded: ()=>Promise<void>,
    isFetchingPage?: boolean,
    response?: {content?: {rendered?: string}},
}

class MyChallengePage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchPageIfNeeded();
        this.props.getInfo().then(()=>this.props.getChallenge());
    }

    render() {
        return (
          <Container>
              <h1>YOUR CHALLENGE</h1>
              <h2>{this.props.challenge && this.props.challenge.name.toUpperCase()}</h2>
              <p>{this.props.challenge && this.props.challenge.description}</p>

              {this.props.challenge && this.props.challenge.text &&
              <h3 className="mt-5">Challenge Info</h3>}
              <p>{this.props.challenge && this.props.challenge.text}</p>
              {this.props.challenge && (this.props.challenge.uploads || []).map((upload, index)=>
                <a key={index.toString()} className="d-block" target="_blank" href={upload.url}>{upload.name}</a>
              )}

              <h3 className="mt-5">How to</h3>
              {this.props.isFetchingPage && <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>}
              {this.props.response && this.props.response.content && <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>}

              {/*<Row className="mt-5">*/}
                  {/*<Col xs={12} md={6} className="mb-3">*/}
                      {/*<CreateTeam/>*/}
                  {/*</Col>*/}
                  {/*{this.props.team &&*/}
                      {/*<Col xs={12} md={6}>*/}
                          {/*<h3>Your Uploads</h3>*/}
                          {/*<TeamUpload/>*/}
                      {/*</Col>*/}
                  {/*}*/}
              {/*</Row>*/}

              {/*<Row className="mt-5">*/}
                  {/*<Col>*/}
                      {/*<h3>Challenge Supervisors</h3>*/}
                      {/*<div className="d-flex flex-wrap">*/}
                          {/*{this.props.challenge && (this.props.challenge.supervisors || []).map((supervisor, index)=>*/}
                          {/*<Card key={index.toString()}*/}
                                {/*title={supervisor.firstName +' '+supervisor.lastName}*/}
                                {/*imageURL={supervisor.imageURL}/>*/}
                          {/*)}*/}
                      {/*</div>*/}
                  {/*</Col>*/}
              {/*</Row>*/}

              <Row className="mt-5">
                  <Col>
                      <h3>Challenge Mentors</h3>
                      <MentorList companyFilter={(this.props.challenge || {}).company}/>
                  </Col>
              </Row>
          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {response, isFetching} = state.pages['3241'] || {response: {content: {rendered: ''}}, isFetching: true};
    const team = state.team.teams.find((team: Team)=> {
        return team.participantIds.includes((state.user.data || {})._id)
    });
    return {
        challenge: state.challenge.challenges.find(challenge=>challenge._id === ((state.user.data || {}).participantsFields || {}).challengeId),
        isFetchingPage: isFetching,
        response,
        team
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getChallenge: () => {
            return dispatch(challengeActions.getChallengesIfNeeded())
        },
        fetchPageIfNeeded: () => {
            return dispatch(pageActions.fetchPageIfNeeded("3241"))
        },
        getInfo: ()=> {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyChallengePage);