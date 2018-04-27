//@flow


import React, {Component} from 'react'
import {Container, Row, Col, Alert} from 'reactstrap'
import ChallengeSelection from './ChallengeSelection'
import {connect} from "react-redux";
import {userActions} from "../../actions/index";
import PreEventInfo from './PreEventInfo';
import styled from 'styled-components'

class PrivatePage extends Component {
    constructor(props) {
        super(props);
        this.challengeSelectionChanged = this.challengeSelectionChanged.bind(this);
        this.preEventChanged = this.preEventChanged.bind(this);
        this.state = {
            showAlert: false,
            timer: null,
        }
    }

    componentDidMount() {
        this.props.getInfo()
    }

    challengeSelectionChanged(userChallenges: {}) {
        console.log('challengeSelectionChanged', userChallenges);
        if (!this.props.data) {return}
        this.props.update({
              ...this.props.data,
                applicantFields: {
                  ...this.props.data.applicantFields,
                    userChallenges
                }
        });
    }

    preEventChanged(preEvent: boolean) {
        if (!this.props.data) {return}
        this.props.update({
            ...this.props.data,
            applicantFields: {
                ...this.props.data.applicantFields,
                preEvent
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if ((!nextProps.updating) && nextProps.updateSuccess) {
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
                      <ChallengeSelection
                        userChallenges={this.props.data.applicantFields.userChallenges}
                        onChange={(userChallenges) => this.challengeSelectionChanged(userChallenges)}
                        loading={this.props.updating}
                        updateSuccess={this.props.updateSuccess}
                      />
                        <PreEventInfo
                        onChange={this.preEventChanged}
                        preEvent={this.props.data.applicantFields.preEvent}
                        loading={this.props.updating}/>
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
    const {loading, updating, updateSuccess} = state.user;
    const data = state.user.data || {};
    return {
        updateSuccess,
        updating,
        loading,
        data
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInfo: () => {
            dispatch(userActions.getInfo())
        },
        update: (user) => {
            dispatch(userActions.update(user))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivatePage);