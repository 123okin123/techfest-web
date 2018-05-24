import { combineReducers } from 'redux';

import { authentication, type AuthState } from './authenticationReducer';
import { registration } from './registrationReducer';
import {pages} from './pageReducer';
import {upload, type UploadState} from './uploadReducer';
import {contact, type ContactState} from "./contactReducer";
import {user, type UserState} from "./userReducer";
import {jobs, type JobsState} from "./jobsReducer";
import {mentors, type MentorsState} from "./mentorsReducer";
import {team, type TeamState} from "./teamReducer";


const rootReducer = combineReducers({
    pages,
    authentication,
    registration,
    upload,
    contact,
    user,
    jobs,
    mentors,
    team
});

export type State = {
    pages: {},
    authentication: AuthState,
    registration: {},
    upload: UploadState,
    contact: ContactState,
    user: UserState,
    jobs: JobsState,
    mentors: MentorsState,
    team: TeamState
}

export default rootReducer;