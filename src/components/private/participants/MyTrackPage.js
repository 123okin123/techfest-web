//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container} from 'reactstrap'
import {challengeActions, pageActions, userActions} from "../../../actions";
import {LoaderContainer} from "../../common";
import {ScaleLoader} from 'react-spinners';
import {type User, type Challenge} from '../../../constants'

type Props = {
    fetchPageIfNeeded: ()=>Promise<void>,
    isFetchingPage?: boolean,
    response?: {content?: {rendered?: string}},
    userData: User,
    getInfo: ()=>Promise<void>,
    challenges: Array<Challenge>,
    getChallenges: ()=>Promise<void>
}

class MyTrackPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchPageIfNeeded();
        this.props.getInfo();
        this.props.getChallenges();
    }

    render() {
        return (
          <Container>
              <h1>YOUR TRACK</h1>
              <h2>{((this.props.userData.startupFields || {}).track || '').toUpperCase()}</h2>
              <h3 className="mt-5">How to</h3>
              {this.props.isFetchingPage && <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>}
              {this.props.response && this.props.response.content && <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>}
              <h3 className="mt-5">Challenge Uploads</h3>
              {(this.props.challenges || []).map((challenge, index)=>
                <div key={index.toString()}>
                <h4 className="mt-4">{challenge.name}</h4>
                  {(challenge.uploads || []).map((upload, index)=>
                      <a key={index.toString()} className="d-block" target="_blank" href={upload.url}>{upload.name}</a>
                  )}
                </div>
              )}
          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {response, isFetching} = state.pages['4111'] || {response: {content: {rendered: ''}}, isFetching: true};
    const challenges = state.challenge.challenges.filter(challenge=>challenge.track.toUpperCase() === ((state.user.data || {}).startupFields || {}).track);

    return {
        isFetchingPage: isFetching,
        response,
        userData:  state.user.data || {},
        challenges
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInfo: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        fetchPageIfNeeded: () => {
            return dispatch(pageActions.fetchPageIfNeeded("4111"))
        },
        getChallenges: () => {
            return dispatch(challengeActions.getChallengesIfNeeded())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTrackPage);