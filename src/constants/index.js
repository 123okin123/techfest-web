//@flow
import {type UserAction} from "./userConstants";
import {type PageAction} from "./pageConstants";
import {type UploadAction} from "./uploadConstants";
import {type ContactAction} from "./contactConstants";
import {type JobAction} from "./jobConstants";
import {type MentorAction} from "./mentorConstants";

export * from './userConstants';
export * from './pageConstants';
export * from './uploadConstants';
export * from './contactConstants';
export * from './jobConstants';
export * from './mentorConstants';

export type Action =
    | UserAction
    | PageAction
    | UploadAction
    | ContactAction
    | JobAction
    | MentorAction

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
export type GetState = () => {};
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;