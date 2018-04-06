//@flow

import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ScrollToTop from './components/other/ScrollToTop'
import { Provider } from 'react-redux';
import {store} from './helpers/store'
import {ThemeProvider} from 'styled-components'
import {BrowserRouter as Router} from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.css';
import './scss/index.css';

const theme = {
    primary: '#000',
    secondary: '#fff',
    background: '#fce200'
};



ReactDOM.render(
    <Provider store={store}>
    <ThemeProvider theme={theme}>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </Router>
    </ThemeProvider>
    </Provider>
    // $FlowFixMe
    , document.getElementById('root'));

