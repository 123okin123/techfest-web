import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import {pages} from './pageReducer';
import {upload, type UploadState} from './uploadReducer';
import {contact} from "./contactReducer";
import {user, type UserState} from "./userReducer";
import {jobs, type JobsState} from "./jobsReducer";
import {mentors, type MentorsState} from "./mentorsReducer";



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

export type State = {
    pages: {},
    authentication: {},
    registration: {},
    upload: UploadState,
    contact: {},
    user: UserState,
    jobs: JobsState,
    mentors: MentorsState,
}

export default rootReducer;