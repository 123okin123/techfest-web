import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import {pages} from './pageReducer';
import {upload} from './uploadReducer';
import {contact} from "./contactReducer";
import {user} from "./userReducer";
import {jobs} from "./jobsReducer";
import {mentors} from "./mentorsReducer";

const rootReducer = combineReducers({
    pages,
    authentication,
    registration,
    upload,
    contact,
    user,
    jobs,
    mentors
});

export default rootReducer;