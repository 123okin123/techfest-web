//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {userActions, teamActions} from "../../../actions";
import {Input, Table, Button, FormGroup, Label} from 'reactstrap'
import {AvField, AvForm} from 'availity-reactstrap-validation'
import {type User, type Team} from '../../../constants'
import styled from "styled-components";


type Props = {
    getUsers: ()=>Promise<Array<User>>,
    getTeamOfUser: (user: User)=>Promise<Array<Team>>,
    getInfo: ()=>Promise<void>,
    saveTeam: (team: Team)=>Promise<Team>,
    updateTeam: (team: Team)=>Promise<Team>,
    users: Array<User>,
    userData: User,
    team?: Team
}
type State = {
    filter: string,
    team?: Team,
    readyState: {
        loading?: boolean,
        ready?: boolean,
        error?: string
    }
}

class CreateTeam extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).addMember = this.addMember.bind(this);
        (this: any).saveTeam = this.saveTeam.bind(this);
        this.state = {
            filter: "",
            team: this.props.team,
            readyState: {
                loading: true
            }
        }
    }


    componentDidMount() {
        this.props.getInfo()
          .then(()=> this.props.getTeamOfUser(this.props.userData))
          .then(()=> this.props.getUsers())
          .then(()=> this.setState({
            ...this.state,
            readyState: {
                ready: true
            }
          })).catch(err=>
        this.setState({
          ...this.state,
            readyState: {
              error: err
            }
        }))

    }

    addMember(user: User) {
        this.setState({
            ...this.state,
            team: {
                ...this.state.team,
                participantIds: [...((this.state.team || {}).participantIds || []), user._id]
            }
        })
    }

    saveTeam(event, values) {
        this.setState({
          ...this.state,
            team: {
              ...this.state.team,
                name: values.name,
                participantIds: [...((this.state.team || {}).participantIds || []), this.props.userData._id],
                challengeId: (this.props.userData.participantsFields || {}).challengeId
            }
        },()=> {
            if (this.props.team) {
                this.state.team && this.props.updateTeam(this.state.team)
            } else {
                this.state.team && this.props.saveTeam(this.state.team)
            }
        })
    }


    render() {
        const filteredUsers = this.props.users.filter(user=>(user.firstName + user.lastName).toLowerCase().search(this.state.filter) !== -1);
        const filteredUserWithOutMe = filteredUsers.filter(user=>user._id !== this.props.userData._id);
        const filteredUserWithOutMeAndTeamUsers = filteredUserWithOutMe.filter(user=> !((this.state.team || {}).participantIds || []).includes(user._id));
        const usersOfTeam = this.props.users.filter(user=> ((this.state.team || {}).participantIds || []).includes(user._id));
        return (

          <div>
              <div>
                  <AvForm onValidSubmit={this.saveTeam}>
                      <AvField lable="Team Name" name="name" value={(this.state.team || {}).name} required/>
                  {usersOfTeam.map((user: User, index)=>
                    <div key={index.toString()}>
                        <p>{user.firstName} {user.lastName}</p>
                        <FormGroup check>
                            <Label check><Input type="checkbox" />{' '}Could come to Launchpad Day.</Label>
                        </FormGroup>
                    </div>
                  )}
                  <Button type="submit">Save</Button>
                  </AvForm>
              </div>

              <Input name="members" onChange={(e)=>this.setState({filter: e.target.value})}/>
              {filteredUserWithOutMeAndTeamUsers.length < 5 &&
              <StyledTable>
                  <tbody>
                  {filteredUserWithOutMeAndTeamUsers.map((user: User, index: number)=>
                      <tr className="" key={index.toString()}>
                          <td className="mb-0">{user.firstName}</td>
                          <td className="mb-0">{user.lastName}</td>
                          <td><Button color="info" onClick={()=>this.addMember(user)}>Add to Team</Button></td>
                      </tr>
                  )}
                  </tbody>
              </StyledTable>
              }
          </div>
        )
    }
}


const StyledTable = styled(Table)`
&>tbody>tr>td {
border-top: 1px solid #000;
}
`;


const mapStateToProps = (state, ownProps) => {
    const team = state.team.teams.find((team: Team)=> {
        return team.participantIds.includes((state.user.data || {})._id)
    });
    return {
        team: team,
        userData: state.user.data || {},
        users:  state.user.users || []
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUsers: ()=> {
            return dispatch(userActions.getUsers())
        },
        getInfo: ()=> {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        getTeamOfUser: (user: User)=> {
            return dispatch(teamActions.getTeamOfUser(user))
        },
        saveTeam: (team: Team) => {
            return dispatch(teamActions.saveTeam(team))
        },
        updateTeam: (team: Team) => {
            return dispatch(teamActions.updateTeam(team))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);