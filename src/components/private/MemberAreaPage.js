//@flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
import {allPartnerRoles, roles} from '../../constants'

type Props = {
    role: string
}

class MemberAreaPage extends Component<Props> {
    render() {
        return (
          <div>
          {this.props.role && allPartnerRoles.includes(this.props.role) && <Redirect to='/private/partner' />}
          {this.props.role && [roles.PARTICIPANT_ROLE, roles.ADMIN_ROLE].includes(this.props.role) && <Redirect to='/private/member-area' />}
          </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { role } = state.authentication;
    return {
        role
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberAreaPage);