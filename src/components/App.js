//@flow
import React, { Component } from 'react';

import Navigation from './other/Navigation';
import MemberNavigation from './other/MemberNavigation';
import HomePage from './home/HomePage'
import ParticipantRegistration from './registration/register/ParticipantRegistration'
import {Route, Switch} from 'react-router-dom'
import Footer from './other/Footer'
import NotFoundPage from "./other/NotFoundPage";
import Page from './Page';
import PartnerRegistration from './registration/PartnerRegistration';
import PressMediaPage from './PressMediaPage';
import VerifyNewsletterPage from './VerifyNewsletterPage';
import styled from 'styled-components';
import LoginPage from './LoginPage';
import PrivateRoute from "./other/PrivateRoute";
import RegisterStartupPage from "./registration/register-startup/RegisterStartupPage";
import RegisterStartPage from "./registration/RegisterStartPage";
import PreEventPage from './private/participants/PreEventPage';
import VerifyRegistrationPage from "./VerifyRegistrationPage";
import {roles, allPartnerRoles} from '../constants/userConstants';
import PartnerPage from "./private/partner/PartnerPage";
import MemberAreaPage from './private/MemberAreaPage';
import JobPage from './private/participants/JobPage';
import PostJobPage from './private/partner/postJob/PostJobPage';
import AdvisorPage from './private/partner/advisorRegistration/AdvisorPage';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword'
import AddMentorPage from './private/partner/mentorRegistration/AddMentorPage'
import GuestRegistrationPage from './private/partner/guestRegistration/GuestRegistrationPage'
import LaunchPadDayPage from './launchPadDay/LaunchPadDayPage'
import LPDGuestRegistrationPage from './private/partner/lpdGuestRegistration/LPDGuestRegistrationPage'




class App extends Component<{}> {
    render() { return (
      <RootComponent id="app-root">
          <Switch>
            <Route exact path="/" render={ () => <Navigation isFrontPage={true}/>}/>
            <Route exact path="/launchpad-day" render={ () => <Navigation isFrontPage={true}/>}/>
            <PrivateRoute path="/private" component={MemberNavigation}/>
            <Route path="/" render={() =><Navigation isFrontPage={false}/>}/>
          </Switch>

          <div style={{marginTop: '5em', minHeight: '100vh'}}>
              <Switch>
                  {/*Private All*/}
                  <PrivateRoute exact path="/private" component={MemberAreaPage}/>
                  <PrivateRoute path="/private/jobs" permittedRoles={Object.values(roles)} component={JobPage}/>

                  {/*Private Partner*/}
                  <PrivateRoute path="/private/partner" permittedRoles={[roles.ADMIN_ROLE].concat(allPartnerRoles)} component={PartnerPage}/>
                  <PrivateRoute path="/private/post-job" permittedRoles={[roles.ADMIN_ROLE, roles.TRACK_PARTNER_ROLE]} component={PostJobPage}/>
                  <PrivateRoute path="/private/register-advisor" permittedRoles={[roles.ADMIN_ROLE, roles.CHALLENGE_PARTNER_ROLE, roles.TRACK_PARTNER_ROLE]} component={AdvisorPage}/>
                  <PrivateRoute path="/private/register-mentor" permittedRoles={[roles.ADMIN_ROLE, ...allPartnerRoles]} component={AddMentorPage}/>
                  <PrivateRoute path="/private/register-guest" permittedRoles={[roles.ADMIN_ROLE, ...allPartnerRoles]} component={GuestRegistrationPage}/>
                  <PrivateRoute path="/private/register-lpd-guest" permittedRoles={[roles.ADMIN_ROLE, ...allPartnerRoles]} component={LPDGuestRegistrationPage}/>


                  {/*Private Participants*/}
                  <PrivateRoute path="/private/member-area" permittedRoles={[roles.ADMIN_ROLE, roles.STARTUP_ROLE, roles.PARTICIPANT_ROLE]} component={PreEventPage}/>


                  {/*Public*/}
                  <Route exact path="/" component={HomePage}/>
                  <Route path="/imprint" render={() => (<Page title="Imprint" id='11'/>)}/>
                  <Route path="/privacy-policy" render={() => (<Page title="Privacy Policy" id='121'/>)}/>
                  <Route path="/terms-conditions" render={() => (<Page title="Terms & Conditions" id='211'/>)}/>
                  <Route path="/register" component={RegisterStartPage}/>
                  <Route path="/register-participant" component={ParticipantRegistration}/>
                  <Route path="/register-startup" component={RegisterStartupPage}/>
                  <Route path="/register-partner" component={PartnerRegistration}/>
                  <Route path="/press-media" component={PressMediaPage}/>
                  <Route path="/verify-newsletter" component={VerifyNewsletterPage}/>
                  <Route path="/verify-register" component={VerifyRegistrationPage}/>
                  <Route path="/forgot-password" component={ForgotPassword}/>
                  <Route path="/reset-password" component={ResetPassword}/>
                  <Route path="/launchpad-day" component={LaunchPadDayPage}/>


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
