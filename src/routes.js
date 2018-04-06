import React from 'react';
import { Route } from 'react-router';

// Components
import Home from './components/home/Home';
import Page from './components/other/Page';
import LoginPage from "./components/other/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import App from './components/App'

export default (
    <Route path="/" component={App}>
        <Route exact path="/" component={Home} />
        <Route path="/page1" render={() => (<Page id='390'/>)}/>
        <Route path="/page2" render={() => (<Page id='224'/>)}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/login" component={LoginPage}/>
    </Route>
);