//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {type User} from "../../constants";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Button} from 'reactstrap';
import {userActions} from "../../actions";

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

class Template extends Component<Props, State> {
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
        // this.props.updateJob({...job, ...values}).then(updateJob=>{
        //     console.log(updateJob);
        //     this.setState({jobs: this.state.jobs.map(jobInState=> jobInState._id === updateJob._id ? {...updateJob, editable: false} : jobInState)});
        // });
    }

    onDelete(guest) {
        this.props.deleteGuest(guest, this.props.userData)
    }

    render() {
        return (
          <div>
              {this.state.guests.length === 0 && <div>No guests yet</div>}
              <ul>
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
                            <li className="border-bottom border-dark p-4" key={index.toString()}>
                                <p className="mb-0">{guest.firstName}</p>
                                <p className="mb-0">{guest.lastName}</p>
                                <p className="mb-0">{guest.email}</p>
                                <p className="mb-0">{guest.numberOfDays}</p>
                                <Button color="info" className="float-right" onClick={()=>this.onDelete(guest)}>Delete</Button>
                                {/*<Button color="info" className="float-right" onClick={()=>this.setState({guests: this.state.guests.map(guestInState=>guestInState._id === guest._id ? {...guest, editable: true}:guestInState)})}>Edit</Button>*/}
                            </li>)
                      }
                  })}
              </ul>
          </div>
        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Template);