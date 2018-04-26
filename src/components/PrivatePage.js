//@flow


import React, {Component} from 'react'
import {Container, Row, Col} from 'reactstrap'
import ChallengeSelection from './ChallengeSelection'
import {connect} from "react-redux";
import {userActions} from "../actions";

class PrivatePage extends Component {
    componentDidMount() {
        this.props.getInfo()
    }

    challengeSelectionChanged(userChallenges: {}) {
        console.log(userChallenges);
        if (!this.props.data) {return}
        this.props.update({
              ...this.props.data,
                applicantFields: {
                  ...this.props.data.applicantFields,
                    userChallenges
                }
        });


    }
    render() {
        console.log(this.props);
        return (
      <Container className="pt-5">
          <h1>MEMBER AREA</h1>
          <Row>
              <Col>
                  {this.props.data.applicantFields &&
                      <ChallengeSelection
                        userChallenges={this.props.data.applicantFields.userChallenges}
                        onChange={(userChallenges) => this.challengeSelectionChanged(userChallenges)}
                        loading={this.props.updating}
                        updateSuccess={this.props.updateSuccess}
                      />
                  }
              </Col>
          </Row>
      </Container>
    )}
}


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