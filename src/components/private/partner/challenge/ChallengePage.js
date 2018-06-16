//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Input, Form, Button, Row, Col} from 'reactstrap'
import {pageActions, userActions, teamActions, challengeActions} from "../../../../actions";
import {LoaderContainer} from "../../../common";
import {ScaleLoader} from 'react-spinners';
import type {User, Team, Challenge} from "../../../../constants";
import TeamList from './TeamList'
import ChallengeUploads from './ChallengeUploads'
import StartupList from "./StartupList";
import {roles} from '../../../../constants'

type Props = {
    getInfo: ()=>Promise<void>,
    userData: User,

    fetchPageIfNeeded: ()=>Promise<void>,
    isFetchingPage?: boolean,
    response?: {content?: {rendered?: string}},

    getTeamsOfPartner: (user: User)=>Promise<Array<Team>>,
    teams: ?Array<Team>,

    getChallenge: ()=>Promise<Challenge>,
    updateChallenge: (Challenge)=>Promise<Challenge>,
    challenge: ?Challenge,

    getUsers: ()=>Promise<Array<User>>,
    users: Array<User>

}

type State = {
    text: string
}

class ChallengePage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).onTextSubmit = this.onTextSubmit.bind(this);
        this.state = {
            text: (this.props.challenge || {}).text || ''
        }

    }

    componentDidMount() {
        this.props.fetchPageIfNeeded();
        this.props.getInfo()
          .then(()=>this.props.getTeamsOfPartner(this.props.userData))
          .then(()=>this.props.getChallenge())
          .then(()=>this.props.getUsers())
          .catch(err=>console.log(err))

    }

    onTextSubmit(event) {
        if (!this.props.challenge) {return}
        event.preventDefault();
        this.props.updateChallenge({...this.props.challenge, text: this.state.text})
    }

    modifyTrackName(track: string = ''): string {
        return track.toLowerCase().replace(/ /g,'')
        //(track.charAt(0).toLowerCase() + track.slice(1)).replace(/ /g,'')
    }

    render() {
        console.log(this.props.users.filter(user=>user.role === roles.STARTUP_ROLE));
        return (
          <Container>

              <h1>YOUR CHALLENGE</h1>
              <h2>{this.props.challenge && this.props.challenge.name.toUpperCase()}</h2>
              <h3 className="mt-5">Description</h3>
              <p>{this.props.challenge && this.props.challenge.description}</p>

              <h3 className="mt-5">How to</h3>
              {this.props.isFetchingPage && <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>}
              {this.props.response && this.props.response.content && <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>}

              <h3 className="mt-5">Your Uploads</h3>
              <Row>
                  <Col className="mb-3" md={6}>
                      <Form onSubmit={this.onTextSubmit}>
                          <Input onChange={(event)=>this.setState({...this.state, text: event.target.value})} value={this.state.text} placeholder='Input will be visible to teams on their "My Challenge" Page' type="textarea" rows="8"/>
                          <Button disabled={(this.props.challenge || {}).updating} className="float-right mt-3" type="submit">Save</Button>
                      </Form>
                  </Col>
                  <Col md={6}>
                    <ChallengeUploads/>
                  </Col>
              </Row>

              <h3 className="mt-5">Your Teams</h3>
              <TeamList users={this.props.users} teams={this.props.teams}/>


              <h3>Your Startup Teams</h3>
              <StartupList startUps={this.props.users.filter(user=>user.role === roles.STARTUP_ROLE).filter(startup=>
            //    this.modifyTrackName(((startup.startupFields || {}).talent || {}).track) === this.modifyTrackName((this.props.challenge || {}).track) ||
              this.modifyTrackName((startup.startupFields || {}).track) === this.modifyTrackName((this.props.challenge || {}).track)
              )
              }/>

          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {response, isFetching} = state.pages['3101'] || {response: {content: {rendered: ''}}, isFetching: true};

    return {
        challenge: state.challenge.challenges.find(challenge=>challenge._id === ((state.user.data || {}).partnerFields || {}).challengeId),
        teams: state.team.teams.filter(team=> team.challengeId === ((state.user.data || {}).partnerFields || {}).challengeId),
        userData: state.user.data || {},
        users: state.user.users || [],
        isFetchingPage: isFetching,
        response
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPageIfNeeded: () => {
            return dispatch(pageActions.fetchPageIfNeeded("3101"))
        },
        getUsers: ()=> {
            return dispatch(userActions.getUsersIfNeeded())
        },
        getInfo: ()=> {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        getChallenge: () => {
            return dispatch(challengeActions.getChallengesIfNeeded())
        },
        getTeamsOfPartner: (user: User) => {
            return dispatch(teamActions.getTeamsOfPartner(user))
        },
        updateChallenge: (challenge: Challenge) => {
            return dispatch(challengeActions.updateChallenge(challenge))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePage);