//@flow
import React, { Component } from 'react';

import Navigation from './other/Navigation'
import Home from './home/Home'
import RegisterPage from './register/RegisterPage'
import {Route, Switch} from 'react-router-dom'
import Footer from './other/Footer'
import NotFoundPage from "./other/NotFoundPage";
import Page from './other/Page';
import PartnerRegistration from './register/PartnerRegistration';
import PressMediaPage from './PressMediaPage';
import VerifyNewsletterPage from './VerifyNewsletterPage';
import styled from 'styled-components';
import LoginPage from './other/LoginPage';
import PrivateRoute from "./other/PrivateRoute";





class App extends Component<{}> {
  render() { return (
      <RootComponent id="app-root">
          <Switch>
              <Route exact path="/" render={ () => <div><Navigation isFrontPage={true}/><Home/></div>}/>
              <Route path="/" render={() => { return(
                  <div>
                  <Navigation isFrontPage={false}/>
                  <div style={{marginTop: '5em', minHeight: '100vh'}}>
                    <Switch>
                        <Route path="/imprint" render={() => (<Page title="Imprint" id='11'/>)}/>
                        <Route path="/privacy-policy" render={() => (<Page title="Privacy Policy" id='121'/>)}/>
                        <Route path="/terms-conditions" render={() => (<Page title="Terms & Conditions" id='211'/>)}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/register-partner" component={PartnerRegistration}/>
                        <Route path="/press-media" component={PressMediaPage}/>
                        <Route path="/verify-newsletter" component={VerifyNewsletterPage}/>
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRoute path="/private" component={PressMediaPage}/>
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
