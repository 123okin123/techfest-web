//@flow

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

//let loggedIn = (typeof localStorage === 'undefined') ?  : localStorage.getItem('user');


const PrivateRoute = ({ component: Component, render,  permittedRoles, ...rest }) => (
    <Route {...rest} render={props => {
        let roleAllowed = true;
        if (permittedRoles) {
            roleAllowed = permittedRoles.includes(rest.role)
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);