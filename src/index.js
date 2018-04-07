//@flow

import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ScrollToTop from './components/other/ScrollToTop'
import { Provider } from 'react-redux';
import configureStore from './store';
import {ThemeProvider} from 'styled-components'
import {BrowserRouter as Router} from 'react-router-dom'
import scTheme from './scTheme'
//import 'bootstrap/dist/css/bootstrap.css';
import './scss/index.css';


// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);
ReactDOM.render(
    <Provider store={store}>
    <ThemeProvider theme={scTheme}>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </Router>
    </ThemeProvider>
    </Provider>
    // $FlowFixMe
    , document.getElementById('root'));

