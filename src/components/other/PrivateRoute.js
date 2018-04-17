//@flow

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

//let loggedIn = (typeof localStorage === 'undefined') ?  : localStorage.getItem('user');


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      props.loggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);

const mapStateToProps = (state) => {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    };
};

export default connect(mapStateToProps)(PrivateRoute);