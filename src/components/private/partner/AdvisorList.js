//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {type User} from "../../../constants/index";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Button, Table} from 'reactstrap';
import {userActions} from "../../../actions/index";
import styled from 'styled-components';

type Props = {
    userData: User,
    +fetchInfoIfNeeded: ()=>Promise<void>,
    +deleteAdvisor: ({}, User)=>Promise<User>
};
type State = {
    advisors: Array<{
        editable?: boolean,
        firstName: string,
        lastName: string,
        email: string,
        numberOfDays: number
    }>
}

class AdvisorList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).handleValidSubmit = this.handleValidSubmit.bind(this);
        (this: any).onDelete = this.onDelete.bind(this);
        const advisors = ((props.userData.partnerFields || {}).advisors || []).map(guest=>{return{...guest, editable: false}});
        this.state = {
            advisors: advisors
        }
    }



    componentDidMount() {
        this.props.fetchInfoIfNeeded()
    }

    componentWillReceiveProps(nextProps) {
        const advisors = ((nextProps.userData.partnerFields || {}).advisors || []).map(guest=>{return{...guest, editable: false}});
        this.state = {
            advisors: advisors
        }
    }


    handleValidSubmit(event, values, guest) {
        values.numberOfDays = 1;
    }

    onDelete(guest) {
        this.props.deleteAdvisor(guest, this.props.userData)
    }

    render() {
        return (
          <div>
              {this.state.advisors.length === 0 && <div>No advisors yet</div>}
              <StyledTable>
                  <tbody>
                  {this.state.advisors.map((guest, index)=> {
                      if (guest.editable) {
                          return (
                            <li className="border-bottom border-dark p-4" key={index.toString()}>
                                <AvForm onValidSubmit={(event, values)=>this.handleValidSubmit(event, values, guest)}
                                        model={{
                                            firstName: guest.firstName,
                                            lastName: guest.lastName,
                                            email: guest.email,
                                        }}>
                                    <AvField name="firstName" required />
                                    <AvField name="lastName" required />
                                    <AvField name="email" required />
                                    {/*<Button onClick={()=>this.setState({guests: this.state.guests.map(guestInState=> guestInState._id === job._id ? {...job, editable: false} : jobInState)})} className="float-right" color="info" >Cancel</Button>*/}
                                    {/*<Button type="submit" className="float-right" color="info" >Save</Button>*/}
                                </AvForm>
                            </li>)
                      } else {
                          return (
                            <tr className="" key={index.toString()}>
                                <td className="mb-0">{guest.firstName}</td>
                                <td className="mb-0">{guest.lastName}</td>
                                <td className="mb-0">{guest.email}</td>
                                <td><Button color="info" onClick={()=>this.onDelete(guest)}>Delete</Button></td>
                                {/*<Button color="info" className="float-right" onClick={()=>this.setState({guests: this.state.guests.map(guestInState=>guestInState._id === guest._id ? {...guest, editable: true}:guestInState)})}>Edit</Button>*/}
                            </tr>)
                      }
                  })}
                  </tbody>
              </StyledTable>
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
    const {data} = state.user;
    return {userData: (data || {})}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchInfoIfNeeded: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
        deleteAdvisor: (guestToDelete, user) => {
            const updatedUser = {
                ...user,
                partnerFields: {
                    ...user.partnerFields,
                    advisors: ((user.partnerFields || {}).advisors || []).filter(guest=>guest.email !== guestToDelete.email)
                }
            };
            return dispatch(userActions.update(updatedUser))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvisorList);