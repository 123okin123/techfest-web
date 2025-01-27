//@flow
import React, {Component} from 'react'
import {Container, Row, Col, Alert} from 'reactstrap'
import ChallengeSelection from './ChallengeSelection'
import {connect} from "react-redux";
import {userActions, pageActions} from "../../../actions/index";
import PreEventInfo from './PreEventInfo';
import styled from 'styled-components'
import {type User, roles} from '../../../constants'
import {ScaleLoader} from 'react-spinners';
import {LoaderContainer} from "../../common";

type Props = {
    data: User,
    +fetchingState: {
        +fetching?: boolean,
        +fetchError?: string,
        +fetchSuccess?: boolean
    },
    +updatingState: {
        +updateError?: string,
        +updating?: boolean,
        +updateSuccess?: boolean
    },
    isFetchingNews: boolean,
    newsPage?: {
        content: {rendered: string},
        acf?: {
            news?: ?Array<{
                title?: string,
                message?: string
            }>
        }
    },
    getNews: ()=> Promise<void>,
    getInfo: ()=>void,
    update: ({})=>void,

    getEventInfo: ()=>Promise<void>,
    isFetchingEventInfo?: boolean,
    eventMap?: ?string,
    agendaImages?: ?Array<{agenda:string}>

}

type State = {
    showAlert: boolean,
    timer: any,
}

class ParticipantPage extends Component<Props,State> {
    constructor(props) {
        super(props);
        (this: any).challengeSelectionChanged = this.challengeSelectionChanged.bind(this);
        (this: any).preEventChanged = this.preEventChanged.bind(this);
        this.state = {
            showAlert: false,
            timer: null,
        }
    }

    componentDidMount() {
        this.props.getInfo();
        this.props.getNews();
        this.props.getEventInfo();
    }

    challengeSelectionChanged(userChallenges: {}) {
        if (!this.props.data) {return}
        this.props.update({
              ...this.props.data,
                applicantFields: {
                  ...this.props.data.applicantFields,
                    userChallenges
                }
        });
    }

    preEventChanged(preEventInfo: {preEvent?: boolean, preEventCount?: number}) {
        if (!this.props.data) {return}
        this.props.update({
            ...this.props.data,
            applicantFields: {
                ...this.props.data.applicantFields,
              ...preEventInfo
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updatingState.updateSuccess) {
            const timer = setInterval(()=>{this.setState({showAlert: false});clearInterval(this.state.timer)}, 3000);
            this.setState({showAlert: true, timer});
        }
    }



    render() {
        return (
      <Container>
          {this.state.showAlert &&
          <StyledAlert className="mt-3 text-center" color="success">
              Saved
          </StyledAlert>
          }
          <h1>MEMBER AREA</h1>
          {this.props.isFetchingNews &&
          <LoaderContainer><ScaleLoader loading={true} height={20} width={2}/></LoaderContainer>
          }
          {this.props.newsPage && this.props.newsPage.content && <div className="mb-5 mt-3" dangerouslySetInnerHTML={{__html: this.props.newsPage.content.rendered}}/>}
          <Row className="mt-5">
              <Col className="mt-5">
                  <h2>News</h2>
                  {this.props.isFetchingNews &&
                  <LoaderContainer><ScaleLoader loading={true} height={20} width={2}/></LoaderContainer>
                  }
                  <div>
                      {((this.props.newsPage || {}).acf || {}).news &&
                          Array.isArray(((this.props.newsPage || {}).acf || {}).news) &&
                      (((this.props.newsPage || {}).acf || {}).news  || []).map((e, i)=>
                          <div key={i.toString()} className="border-bottom border-dark p-3">
                              <h5>{e.title}</h5>
                              <p>{e.message}</p>
                          </div>
                      )
                      }
                  </div>
              </Col>
          </Row>

          <Row className="mt-5">
              <Col className="mt-5">
                  <h2>Event Map</h2>
                  {this.props.isFetchingEventInfo &&
                  <LoaderContainer><ScaleLoader loading={true} height={20} width={2}/></LoaderContainer>
                  }
                  <EventMap src={this.props.eventMap}/>
              </Col>
          </Row>

          <Row className="mt-5">
              <Col className="mt-5">
                  <h2>Agenda</h2>
                  {this.props.isFetchingEventInfo &&
                  <LoaderContainer><ScaleLoader loading={true} height={20} width={2}/></LoaderContainer>
                  }
                  {Array.isArray(this.props.agendaImages) && this.props.agendaImages.map((element, index)=>
                    <EventMap key={index.toString()} src={element.agenda}/>
                  )}
              </Col>
          </Row>


          {/* <Row className="mt-5">
              <Col>
                  {this.props.data.applicantFields &&
                    <div>
                        {this.props.data.role !== roles.STARTUP_ROLE &&
                          <ChallengeSelection
                            userChallenges={this.props.data.applicantFields.userChallenges}
                            onChange={(userChallenges) => this.challengeSelectionChanged(userChallenges)}
                            loading={this.props.updatingState.updating}
                          />
                        }
                        <PreEventInfo
                        onChange={this.preEventChanged}
                        userData={this.props.data}
                        loading={this.props.updatingState.updating}/>
                    </div>
                  }

              </Col>
          </Row> */}
      </Container>
    )}
}
const StyledAlert = styled(Alert)`
    position: fixed !important;
    right: 10px;
    top: 6em;
    z-index: 10000;
    width: calc(100% - 20px);
    max-width: 200px;
    box-shadow: 0px 7px 10px 0px #00000024;
`;
const EventMap = styled.img`
  width: 100%;
`;


const mapStateToProps = (state, ownProps) => {
    const {response, isFetching} = state.pages['3981'] || {response: {content: {rendered: ''}}, isFetching: false};
    const eventMap = (((state.pages['4241'] || {}).response || {}).acf || {}).event_map || '';
    const {fetchingState, updatingState} = state.user;
    const data = state.user.data || {};
    return {
        updatingState,
        fetchingState,
        data,
        isFetchingNews: isFetching,
        newsPage: response,
        eventMap: (((state.pages['4241'] || {}).response || {}).acf || {}).event_map || '',
        isFetchingEventInfo: (state.pages['4241'] ||{}).isFetching,
        agendaImages:  (((state.pages['4241'] || {}).response || {}).acf || {}).agenda_images ,
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInfo: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        update: (user) => {
            return dispatch(userActions.update(user))
        },
        getNews: () => {
            return dispatch(pageActions.fetchPageIfNeeded('3981'))
        },
        getEventInfo: () => {
            return dispatch(pageActions.fetchPageIfNeeded('4241'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantPage);