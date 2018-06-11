//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col, Form, Input, Button, Label, FormGroup} from 'reactstrap'
import {challengeActions, pageActions, userActions} from "../../../../actions/index";
import {LoaderContainer} from "../../../common/index";
import {ScaleLoader} from 'react-spinners';
import {type User, type Challenge} from '../../../../constants/index'
import StartupUpload from './StartupUpload'
import MentorList from '../../common/MentorList'

type Props = {
    fetchPageIfNeeded: ()=>Promise<void>,
    isFetchingPage?: boolean,
    response?: {content?: {rendered?: string}},
    userData?: User,
    getInfo: ()=>Promise<void>,
    challenges: Array<Challenge>,
    getChallenges: ()=>Promise<void>,
    updateStartup: (User)=>Promise<User>,
    updatingUserState: {
        +updateError?: string,
        +updating?: boolean,
        +updateSuccess?: boolean
    }
}

type State = {
    comment: string
}
const tracks: {[string]: string} = {
    THE_SMART_AUTOMATION_WAVE : 'THE SMART AUTOMATION WAVE',
    QUANTIFIED_EARTH_AND_SPACE : 'QUANTIFIED EARTH AND SPACE',
    FUTURE_MOBILITY_AND_TRANSPORT: 'FUTURE MOBILITY AND TRANSPORT',
    FLEXIBLE_TRACK: 'FLEXIBLE TRACK'
};
class MyTrackPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).onTextSubmit = this.onTextSubmit.bind(this);
        (this: any).onLpdClicked = this.onLpdClicked.bind(this);
        this.state = {
            comment: ''
        }
    }

    componentDidMount() {
        this.props.fetchPageIfNeeded();
        this.props.getInfo().then(()=>{
            this.setState({
                comment: ((this.props.userData || {}).startupFields || {}).trackComment
            });
        });
        this.props.getChallenges();
    }

    onTextSubmit(event) {
        if (!this.props.userData) {return}
        event.preventDefault();
        this.props.updateStartup({
          ...this.props.userData,
            startupFields: {
              //$FlowFixMe
              ...this.props.userData.startupFields,
                trackComment: this.state.comment
            }
        })
    }

    onLpdClicked(event) {
        if (!this.props.userData) {return}
        this.props.updateStartup({
            ...this.props.userData,
            startupFields: {
                //$FlowFixMe
                ...this.props.userData.startupFields,
                couldComeToLPD: event.target.checked
            }
        })
    }

    render() {
        const dbTrackName = ((((this.props.userData || {}).startupFields || {}).talent || {}).track || '');
        //$FlowFixMe
        const trackName :string = Object.values(tracks).find((track)=>(track: string).replace(/ /g,'') === dbTrackName.toUpperCase());
        return (
          <Container>
              <h1>YOUR TRACK</h1>
              <h2 className="mb-5">{trackName}</h2>
              {this.props.isFetchingPage && <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>}
              {this.props.response && this.props.response.content && <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>}
              <Row className="mt-5">
                  <Col xs={12} lg={6}>
                      <h3>Your Uploads</h3>
                      <StartupUpload/>
                  </Col>
                  <Col xs={12} lg={6}>
                      <h3>Your Comment</h3>
                      <Form onSubmit={this.onTextSubmit}>
                          <Input onChange={(event)=>this.setState({...this.state, comment: event.target.value})} value={this.state.comment} placeholder='Input will be visible to track partner' type="textarea" rows="8"/>
                          <Button disabled={(this.props.updatingUserState || {}).updating} className="float-right mt-3" type="submit">Save</Button>
                      </Form>
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <FormGroup check>
                          <Label className="h4" check>
                            <Input type="checkbox" checked={((this.props.userData || {}).startupFields ||{}).couldComeToLPD || false} onChange={this.onLpdClicked}/>
                              We would come the Launch Pad Day.
                          </Label>
                      </FormGroup>
                  </Col>
              </Row>
              {(this.props.challenges || []).length > 0 &&
                <div className="mt-5">
                  <h2 className="my-3">Challenges</h2>
                    <p className="mb-5">Below you find all information concerning the Challenges that belong to your Track. Your Start-up Team will not work on the Challenges. These information should only give you an overview of your Track's proposed problems and relevant topics.</p>
                  {(this.props.challenges || []).map((challenge, index)=>
                    <div className="mb-5" key={index.toString()}>
                    <h3>{challenge.name}</h3>
                        <p>{challenge.description}</p>
                        <h4 className="mt-3">Challenge Uploads</h4>
                      {(challenge.uploads || []).map((upload, index) =>
                          <a key={index.toString()} className="d-block" target="_blank" href={upload.url}>{upload.name}</a>
                      )}
                        {(challenge.uploads || []).length === 0 &&
                        <p className="text-center">No uploads yet.</p>
                        }
                        <h4 className="mt-3">Challenge Mentors</h4>
                        <MentorList companyFilter={challenge.company}/>
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
        userData:  state.user.data,
        updatingUserState: state.user.updatingState,
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
        },
        updateStartup: (user: User) => {
            return dispatch(userActions.update(user))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTrackPage);