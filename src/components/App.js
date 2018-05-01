//@flow
import React, { Component } from 'react';

import Navigation from './other/Navigation';
import MemberNavigation from './other/MemberNavigation';
import HomePage from './home/HomePage'
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
import PreEventPage from './private/PreEventPage';
import VerifyRegistrationPage from "./VerifyRegistrationPage";
import {roles, allPartnerRoles} from '../constants/userConstants';
import PartnerPage from "./private/PartnerPage";
import MemberAreaPage from './private/MemberAreaPage';




class App extends Component<{}> {
    render() { return (
      <RootComponent id="app-root">
          <Switch>
            <Route exact path="/" render={ () => <Navigation isFrontPage={true}/>}/>
            <PrivateRoute path="/private" component={MemberNavigation}/>
            <Route path="/" render={() =><Navigation isFrontPage={false}/>}/>
          </Switch>

          <div style={{marginTop: '5em', minHeight: '100vh'}}>
              <Switch>
                  <PrivateRoute exact path="/private" component={MemberAreaPage}/>
                  <PrivateRoute path="/private/pre-event" permittedRoles={[roles.ADMIN_ROLE, roles.PARTICIPANT_ROLE]} component={PreEventPage}/>
                  <PrivateRoute path="/private/partner" permittedRoles={[roles.ADMIN_ROLE].concat(allPartnerRoles)} component={PartnerPage}/>

                  <Route exact path="/" component={HomePage}/>
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
          <Footer/>
      </RootComponent>
    );
    }
}


const RootComponent = styled.div`
display: none;
`;





export default App;
