//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container} from 'reactstrap'
import {pageActions, userActions} from "../../../../actions";
import {LoaderContainer} from "../../../common";
import {ScaleLoader} from 'react-spinners';
import type {User, Team} from "../../../../constants";

type Props = {
    userData: User,
    getTeamsOfPartner: (user: User)=>Promise<Array<Team>>,
    fetchPageIfNeeded: ()=>Promise<void>,
    getInfo: ()=>Promise<void>,
    isFetchingPage?: boolean,
    teams: Array<Team>,
    response?: {content?: {rendered?: string}}
}

class ChallengePage extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchPageIfNeeded();
        this.props.getInfo()
          .then(()=>this.props.getTeamsOfPartner(this.props.userData))
          .catch(err=>console.log(err))

    }

    render() {
        return (
          <Container>
              {this.props.isFetchingPage &&
              <LoaderContainer><ScaleLoader loading={this.props.isFetchingPage} height={20} width={2}/></LoaderContainer>
              }
              {this.props.response && this.props.response.content &&
              <div dangerouslySetInnerHTML={{__html: this.props.response.content.rendered}}/>
              }



          </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {response, isFetching} = state.pages['3101'] || {response: {content: {rendered: ''}}, isFetching: true};
    return {
        team: state.team.teams,
        userData: state.user.data || {},
        isFetchingPage: isFetching,
        response
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPageIfNeeded: () => {
            return dispatch(pageActions.fetchPageIfNeeded("3101"))
        },
        getInfo: ()=> {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        getTeamsOfPartner: (user: User) => {
            return dispatch(pageActions.getTeamsOfPartner(user))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePage);