//@flow
import React, {Component} from 'react'
import {Container, Row, Col, Alert} from 'reactstrap'
import ChallengeSelection from './ChallengeSelection'
import {connect} from "react-redux";
import {userActions} from "../../../actions/index";
import PreEventInfo from './PreEventInfo';
import styled from 'styled-components'
import {type User, roles} from '../../../constants'

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
    getInfo: ()=>void,
    update: ({})=>void
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
        this.props.getInfo()
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
      <Container className="pt-5">
          {this.state.showAlert &&
          <StyledAlert className="mt-3 text-center" color="success">
              Saved
          </StyledAlert>}
          <h1>MEMBER AREA</h1>
          <Row>
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
          </Row>
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

const mapStateToProps = (state, ownProps) => {
    const {fetchingState, updatingState} = state.user;
    const data = state.user.data || {};
    return {
        updatingState,
        fetchingState,
        data
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInfo: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        update: (user) => {
            return dispatch(userActions.update(user))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantPage);