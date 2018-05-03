//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import {type User} from '../../constants'
import {getCookie} from "../../helpers/session";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Button} from 'reactstrap'
import AddGuest from './AddGuest';
import GuestList from './GuestList';
import {userActions} from "../../actions";

type Props = {
    userData: User,
    fetchInfoIfNeeded: ()=>Promise<void>
}


class PartnerGuestRegistration extends Component<Props> {
    constructor(props: Props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        return (
          <div>
              <h4>Guest Registration</h4>
              <AddGuest/>
              <h5>Registered Guests</h5>
              <GuestList/>
          </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchInfoIfNeeded: () => {
            return dispatch(userActions.fetchInfoIfNeeded())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerGuestRegistration);