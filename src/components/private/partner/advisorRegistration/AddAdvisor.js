//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Button, Row, Col} from 'reactstrap';
import {userActions} from "../../../../actions/index";
import {type User, roles} from '../../../../constants/index';

type Props = {
    userData: User,
    add: ({}, User)=>Promise<void>
}

class AddAdvisor extends Component<Props> {
    constructor(props: Props) {
        super(props);
        (this: any).onValidSubmit = this.onValidSubmit.bind(this);
        (this: any).getNumberOfDayTicketsUsed = this.getNumberOfDayTicketsUsed.bind(this);
        (this: any).allowedNumberOfDayTickets = this.allowedNumberOfDayTickets.bind(this);
    }


    onValidSubmit(event, values) {
        values.numberOfDays = 4;
        if ((this.getNumberOfDayTicketsUsed() < this.allowedNumberOfDayTickets())) {
            this.props.add(values, this.props.userData).then(()=>{
                (this: any).form && (this: any).form.reset();
            })
        }
    }

    getNumberOfDayTicketsUsed() :number {
        const advisors = ((this.props.userData.partnerFields || {}).advisors || []);
        const numberOfDaysArray = advisors.map(guest=> guest.numberOfDays);
        return (numberOfDaysArray.length <= 0) ? 0 : numberOfDaysArray.reduce((acc, val) => (acc + val))
    }

    allowedNumberOfDayTickets() :number {
        let allowedNumber = 0;
        switch (this.props.userData.role) {
            case roles.TRACK_PARTNER_ROLE: allowedNumber = 7; break;
            case roles.CHALLENGE_PARTNER_ROLE: allowedNumber = 7; break;
            case roles.TECHNOLOGY_PARTNER_ROLE: allowedNumber = 5; break;
            case roles.ECOSYSTEM_PARTNER_ROLE: allowedNumber = 5; break;
            default: allowedNumber = 7;
        }
        return allowedNumber
    }


    render() {
        return (
          <div>
              <p>Advisor: {this.getNumberOfDayTicketsUsed()}/{this.allowedNumberOfDayTickets()}</p>
              <AvForm onValidSubmit={this.onValidSubmit}>
                  <Row>
                      <Col sm={3}><AvField name="firstName" label="First Name" required/></Col>
                      <Col sm={3}><AvField name="lastName" label="Last Name" required/></Col>
                      <Col sm={3}><AvField name="email" label="Email" type="email" required/></Col>
                      <Col sm={3} style={{paddingTop: '30px'}}><Button color="primary" type="submit">Add</Button></Col>
                  </Row>
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
            const updatedUser :User = {
                ...user,
                partnerFields: {
                    ...user.partnerFields,
                    advisors: [...((user.partnerFields || {}).advisors || []), guest]
                }
            };
            return dispatch(userActions.update(updatedUser))
        }
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(AddAdvisor);