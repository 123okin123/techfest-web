//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Row, Col} from 'reactstrap'
import AddMentor from './AddMentor'
import {userActions} from "../../../actions";
import MentorList from './MentorList'

type Props = {
    userData: {},
    fetchInfoIfNeeded: ()=>Promise<void>,
}

class AddMentorPage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }
    componentDidMount() {
        this.props.fetchInfoIfNeeded();
    }

    render() {
        return (
          <Container>
              <Row>
                  <Col md={6}>
                      <h1>REGISTER YOUR MENTORS</h1>
                      <h2>Add new Mentors here.</h2>
                  </Col>
                  <Col md={6} className="text-center"><AddMentor userData={this.props.userData}/></Col>
              </Row>
              <MentorList className="mt-5" userData={this.props.userData}/>
          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {data} = state.user;
    return {
        userData: (data || {}),
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchInfoIfNeeded: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMentorPage);