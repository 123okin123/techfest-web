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
    +deleteGuest: ({}, User)=>Promise<User>
};
type State = {
    guests: Array<{
        editable?: boolean,
        firstName: string,
        lastName: string,
        email: string,
        numberOfDays: number
    }>
}

class GuestList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).handleValidSubmit = this.handleValidSubmit.bind(this);
        (this: any).onDelete = this.onDelete.bind(this);
        const guests = ((props.userData.partnerFields || {}).guests || []).map(guest=>{return{...guest, editable: false}});
        this.state = {
            guests: guests
        }
    }



    componentDidMount() {
        this.props.fetchInfoIfNeeded()
    }

    componentWillReceiveProps(nextProps) {
        const guests = ((nextProps.userData.partnerFields || {}).guests || []).map(guest=>{return{...guest, editable: false}});
        this.state = {
            guests: guests
        }
    }


    handleValidSubmit(event, values, guest) {
        values.numberOfDays = parseInt(values.numberOfDays);
    }

    onDelete(guest) {
        this.props.deleteGuest(guest, this.props.userData)
    }

    render() {
        return (
          <div>
              {this.state.guests.length === 0 && <div>No guests yet</div>}
              <StyledTable>
                  <tbody>
                  {this.state.guests.map((guest, index)=> {
                      if (guest.editable) {
                          return (
                            <li className="border-bottom border-dark p-4" key={index.toString()}>
                                <AvForm onValidSubmit={(event, values)=>this.handleValidSubmit(event, values, guest)}
                                        model={{
                                            firstName: guest.firstName,
                                            lastName: guest.lastName,
                                            email: guest.email,
                                            numberOfDays: guest.numberOfDays
                                        }}>
                                    <AvField name="firstName" required />
                                    <AvField name="lastName" required />
                                    <AvField name="email" required />
                                    <AvField name="numberOfDays" required />
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
                                <td className="mb-0">Number of day tickets: {guest.numberOfDays}</td>
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
        deleteGuest: (guestToDelete, user) => {
            const updatedUser = {
                ...user,
                partnerFields: {
                    ...user.partnerFields,
                    guests: ((user.partnerFields || {}).guests || []).filter(guest=>guest.email !== guestToDelete.email)
                }
            };
            return dispatch(userActions.update(updatedUser))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestList);