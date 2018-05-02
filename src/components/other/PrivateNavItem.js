//@flow

import React from 'react';
import {connect} from "react-redux";
import styled from 'styled-components'
import { NavLink as NavLink, Route } from 'react-router-dom';
import { NavItem} from 'reactstrap';

const PrivateNavItem = ({ title,  permittedRoles, to, isLogin, ...rest }) => {
    let roleAllowed = true;
    if (permittedRoles) {
        roleAllowed = permittedRoles.includes(rest.role)
    }
    return (
    rest.loggedIn && roleAllowed ?
      <Route path={to} children={(match)=> {return (
        <StyledNavItem isLogin={isLogin} className={match ? "active" : ""}>
            <StyledNavLink isLogin={isLogin} to={to}  {...rest} >{title}</StyledNavLink>
        </StyledNavItem>
      )}}/>
      : <span/>
    )
};

const StyledNavItem = styled(({isLogin, ...rest}) => {return(<NavItem {...rest}/>)})`
    padding: 0.8em;
    @media (min-width: 992px) { 
    & .active {
    border-bottom: ${props=> props.isLogin ? '': '3px solid #000'};
    padding-bottom: ${props=> props.isLogin ? '': '1.2em'};
    }
    }
`;

const StyledNavLink = styled(({isLogin, role, loggedIn, ...rest}) => {return (<NavLink {...rest} />)})`
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