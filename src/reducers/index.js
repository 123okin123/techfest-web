import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { alert } from './alertReducer';
import {pages} from './pageReducer';
import {upload} from './uploadReducer';
import {contact} from "./contactReducer";

const rootReducer = combineReducers({
    pages,
    authentication,
    registration,
    alert,
    upload,
    contact
});

export default rootReducer;