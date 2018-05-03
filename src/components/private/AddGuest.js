//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Button} from 'reactstrap';
import {userActions} from "../../actions";
import {type User, roles} from '../../constants';

type Props = {
    userData: User,
    add: ({}, User)=>Promise<void>
}

class AddGuest extends Component<Props> {
    constructor(props: Props) {
        super(props);
        (this: any).onValidSubmit = this.onValidSubmit.bind(this);
        (this: any).getNumberOfDayTicketsUsed = this.getNumberOfDayTicketsUsed.bind(this);
        (this: any).allowedNumberOfDayTickets = this.allowedNumberOfDayTickets.bind(this);
    }


    onValidSubmit(event, values) {
        values.numberOfDays = parseInt(values.numberOfDays);
        if ((this.getNumberOfDayTicketsUsed() < this.allowedNumberOfDayTickets())) {
            this.props.add(values, this.props.userData).then(()=>{
                (this: any).form && (this: any).form.reset();
            })
        }
    }


    getNumberOfDayTicketsUsed() :number {
        const guests = ((this.props.userData.partnerFields || {}).guests || []);
        const numberOfDaysArray = guests.map(guest=> guest.numberOfDays);
         return (numberOfDaysArray.length <= 0) ? 0 : numberOfDaysArray.reduce((acc, val) => (acc + val))
    }

    allowedNumberOfDayTickets() :number {
        let allowedNumber = 10;
        switch (this.props.userData.role) {
            case roles.TRACK_PARTNER_ROLE: allowedNumber = 50; break;
            case roles.CHALLENGE_PARTNER_ROLE: allowedNumber = 20; break;
            default: allowedNumber = 10;
        }
        return allowedNumber
    }

    render() {
        return (
          <div>
              <p>Day Tickets: {this.getNumberOfDayTicketsUsed()}/{this.allowedNumberOfDayTickets()}</p>
              <AvForm onValidSubmit={this.onValidSubmit}>
                  <AvField name="firstName" label="First Name" required/>
                  <AvField name="lastName" label="Last Name" required/>
                  <AvField name="email" label="Email" type="email" required/>
                  <AvField type="select" name="numberOfDays" label="Number of Day Tickets" required>
                      <option/>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                  </AvField>

                  <Button color="primary" type="submit">Save</Button>
              </AvForm>
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
        add: (guest, user) => {
            const updatedUser = {
              ...user,
                partnerFields: {
                  ...user.partnerFields,
                    guests: [...((user.partnerFields || {}).guests || []), guest]
                }
            };
            return dispatch(userActions.update(updatedUser))
        }
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(AddGuest);