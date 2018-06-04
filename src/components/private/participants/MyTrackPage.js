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
              <h2 className="mb-5">{((this.props.userData.startupFields || {}).track || '').toUpperCase()}</h2>
              {this.props.isFetchingPage && <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>}
              {this.props.response && this.props.response.content && <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>}
              {(this.props.challenges || []).length > 0 &&
                <div className="mt-5">
                  <h2 className="my-3">Challenges</h2>
                    <p className="mb-5">Below you find all information concerning the Challenges that belong to your Track. Your Start-up Team will not work on the Challenges. These information should only give you an overview of your Track's proposed problems and relevant topics.</p>
                  {(this.props.challenges || []).map((challenge, index)=>
                    <div className="mb-5" key={index.toString()}>
                    <h4>{challenge.name}</h4>
                        <p>{challenge.description}</p>
                        <h5 className="mt-3">Challenge Uploads</h5>
                      {(challenge.uploads || []).map((upload, index) =>
                          <a key={index.toString()} className="d-block" target="_blank" href={upload.url}>{upload.name}</a>
                      )}
                    </div>
                  )}
                </div>
              }
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