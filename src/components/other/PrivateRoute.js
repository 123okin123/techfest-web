//@flow

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

//let loggedIn = (typeof localStorage === 'undefined') ?  : localStorage.getItem('user');


const PrivateRoute = ({ component: Component, render,  permittedRoles, permittedEmails, ...rest }) => (
    <Route {...rest} render={props => {
        let roleAllowed = true;
        if (permittedRoles) {
            roleAllowed = permittedRoles.includes(rest.role)
        }
        if (permittedEmails) {
            roleAllowed = permittedEmails.includes(rest.email)
        }
        if (rest.loggedIn && roleAllowed) {
            if (Component) {
                return <Component {...props} />
            } else {return render()}
        } else {
            return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        }
    }} />
);

const mapStateToProps = (state) => {
    const { loggedIn, role, email } = state.authentication;
    return {
        loggedIn,
        role,
        email
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);