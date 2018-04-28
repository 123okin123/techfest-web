//@flow
import React, { Component } from 'react';

import Navigation from './other/Navigation';
import MemberNavigation from './other/MemberNavigation';
import Home from './home/HomePage'
import RegisterPage from './register/RegisterPage'
import {Route, Switch} from 'react-router-dom'
import Footer from './other/Footer'
import NotFoundPage from "./other/NotFoundPage";
import Page from './Page';
import PartnerRegistration from './PartnerRegistration';
import PressMediaPage from './PressMediaPage';
import VerifyNewsletterPage from './VerifyNewsletterPage';
import styled from 'styled-components';
import LoginPage from './LoginPage';
import PrivateRoute from "./other/PrivateRoute";
import RegisterStartupPage from "./register-startup/RegisterStartupPage";
import RegisterStartPage from "./RegisterStartPage";
import PrivatePage from './private/PrivatePage';
import VerifyRegistrationPage from "./VerifyRegistrationPage";
import {roles} from '../constants/userConstants';
import PartnerPage from "./private/PartnerPage";

const allPartnerRoles = [
    roles.CHALLENGE_PARTNER_ROLE,
    roles.ECOSYSTEM_PARTNER_ROLE,
    roles.TECHNOLOGY_PARTNER_ROLE,
    roles.TRACK_PARTNER_ROLE
];


class App extends Component<{}> {
  render() { return (
      <RootComponent id="app-root">
          <Switch>
              <Route exact path="/" render={ () => <div><Navigation isFrontPage={true}/><Home/></div>}/>
              <PrivateRoute path="/private" render={ () => { return (
                <div>
                    <MemberNavigation isFrontPage={false}/>
                    <div style={{marginTop: '5em', minHeight: '100vh'}}>
                        <Switch>
                            <PrivateRoute exact path="/private" permittedRoles={[roles.ADMIN_ROLE, roles.PARTICIPANT_ROLE]} component={PrivatePage}/>
                            <PrivateRoute path="/private/partner" permittedRoles={[roles.ADMIN_ROLE].concat(allPartnerRoles)} component={PartnerPage}/>
                            <Route component={NotFoundPage}/>
                        </Switch>
                    </div>
                </div>
              )}}/>
              <Route path="/" render={() => { return(
                  <div>
                  <Navigation isFrontPage={false}/>
                  <div style={{marginTop: '5em', minHeight: '100vh'}}>
                    <Switch>
                        <Route path="/imprint" render={() => (<Page title="Imprint" id='11'/>)}/>
                        <Route path="/privacy-policy" render={() => (<Page title="Privacy Policy" id='121'/>)}/>
                        <Route path="/terms-conditions" render={() => (<Page title="Terms & Conditions" id='211'/>)}/>
                        <Route path="/register" component={RegisterStartPage}/>
                        <Route path="/register-participant" component={RegisterPage}/>
                        <Route path="/register-startup" component={RegisterStartupPage}/>
                        <Route path="/register-partner" component={PartnerRegistration}/>
                        <Route path="/press-media" component={PressMediaPage}/>
                        <Route path="/verify-newsletter" component={VerifyNewsletterPage}/>
                        <Route path="/verify-register" component={VerifyRegistrationPage}/>

                        <Route path="/login" component={LoginPage}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                  </div>
                  </div>
              )}}/>
          </Switch>
          <Footer/>
      </RootComponent>
    );
  }
}


const RootComponent = styled.div`
display: none;
`;



export default App;
