//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import type {Team, User} from '../../../../constants'
import {getCookie} from "../../../../helpers/session";
import styled from "styled-components";

type Props = {
    teams: Array<Team>,
    className?: string,
    users: Array<User>
}

class TeamList extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
          <TeamCollection className={this.props.className}>
              {this.props.teams.map((team, index: number)=>
                <TeamContainer key={index.toString()}>
                    <ImageContainer image={team.imageURL}/>
                    <h3>{team.name}</h3>
                    {this.props.users.filter(user=> team.participantIds.includes(user._id)).map((user, index)=>
                      <p key={index.toString()} className="mb-1">{user.firstName} {user.lastName}</p>
                    )}
                </TeamContainer>
              )}
              {this.props.teams.length === 0 &&
              <p>No teams yet.</p>
              }
          </TeamCollection>
        )
    }
}


const TeamCollection = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const TeamContainer = styled.div`
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px #0006;
    max-width: 350px;
    overflow: hidden;
    margin: 20px;
    text-align: center;
    width: 300px;
    padding-bottom: 20px;
`;

const ImageContainer = styled.div`
    background: url(${(props)=> props.image + '?token=' + getCookie("jwt")}) no-repeat center;
    background-size: cover;
    height: 200px;
    width: 100%;
    margin-bottom: 20px;
    background-color: #e9ecef;
`;

const mapStateToProps = (state, ownProps) => {
    return {}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);