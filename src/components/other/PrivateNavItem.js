//@flow

import React from 'react';
import {connect} from "react-redux";
import styled from 'styled-components'
import {NavLink, NavItem} from 'reactstrap';

const PrivateNavItem = ({ title,  permittedRoles, ...rest }) => {
    let roleAllowed = true;
    if (permittedRoles) {
        roleAllowed = permittedRoles.includes(rest.role)
    }
    return (
    rest.loggedIn && roleAllowed ?
        <StyledNavItem>
            <StyledNavLink {...rest} >{title}</StyledNavLink>
        </StyledNavItem>
      : <div/>
    )
};

const StyledNavItem = styled(NavItem)`
  padding: 0.8em;
`;

const StyledNavLink = styled(({isLogin, ...rest}) => <NavLink {...rest} />)`
    color: #000!important;
    &:hover {
    text-decoration: none;
    color: #828282;
    }
    background: ${props=> props.isLogin ? '#e4d041': ''};
    padding: ${props=> props.isLogin ? '0.3em 0.7em': ''};
    border-radius: ${props=> props.isLogin ? '3px': ''};
`;

const mapStateToProps = (state) => {
    const { loggedIn, role } = state.authentication;
    return {
        loggedIn,
        role
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateNavItem);