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
    launchPadGuests: Array<{
        editable?: boolean,
        firstName: string,
        lastName: string,
        email: string,
        numberOfDays: number
    }>
}

class LaunchPadGuestList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        (this: any).handleValidSubmit = this.handleValidSubmit.bind(this);
        (this: any).onDelete = this.onDelete.bind(this);
        const launchPadGuests = ((props.userData.partnerFields || {}).launchPadGuests || []).map(guest=>{return{...guest, editable: false}});
        this.state = {
            launchPadGuests: launchPadGuests
        }
    }



    componentDidMount() {
        this.props.fetchInfoIfNeeded()
    }

    componentWillReceiveProps(nextProps) {
        const launchPadGuests = ((nextProps.userData.partnerFields || {}).launchPadGuests || []).map(guest=>{return{...guest, editable: false}});
        this.state = {
            launchPadGuests: launchPadGuests
        }
    }


    handleValidSubmit(event, values, guest) {
        values.numberOfDays = 1;
    }

    onDelete(guest) {
        this.props.deleteGuest(guest, this.props.userData)
    }

    render() {
        return (
          <div>
              {this.state.launchPadGuests.length === 0 && <div>No guests yet</div>}
              <StyledTable>
                  <tbody>
                  {this.state.launchPadGuests.map((guest, index)=> {
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
        deleteGuest: (guestToDelete, user) => {
            const updatedUser = {
                ...user,
                partnerFields: {
                    ...user.partnerFields,
                    launchPadGuests: ((user.partnerFields || {}).launchPadGuests || []).filter(guest=>guest.email !== guestToDelete.email)
                }
            };
            return dispatch(userActions.update(updatedUser))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchPadGuestList);