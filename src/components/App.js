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





class App extends Component<{}> {
  render() { return (
      <div>
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
                        <Route component={NotFoundPage}/>
                    </Switch>
                  </div>
                  </div>
              )}}/>
          </Switch>
          <Footer/>
      </div>
    );
  }
}




export default App;
