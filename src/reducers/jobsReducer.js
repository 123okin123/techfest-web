//@flow

import {type Action, jobConstants} from '../constants';

type State = {
    +loading?: boolean,
    +items?: Array<{}>,
    +fetchError?: string,
    +deleteError?: string,
    +updateError?: string,
    +saveError?: string
}

export function jobs(state: State = {}, action: Action):State {
    switch (action.type) {
        case jobConstants.GET_JOBS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case jobConstants.GET_JOBS_SUCCESS:
            return {
                ...state,
                items: action.jobs
            };
        case jobConstants.GET_JOBS_FAILURE:
            return {
                ...state,
                fetchError: action.error
            };
        case jobConstants.SAVE_JOB_REQUEST:
            return {
                ...state,
                loading: true
            };
        case jobConstants.SAVE_JOB_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.job]
            };
        case jobConstants.SAVE_JOB_FAILURE:
            return {
                ...state,
                saveError: action.error
            };
        case jobConstants.DELETE_JOB_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(job =>
                  job._id === action.id
                    ? { ...job, deleting: true }
                    : job
                )
            };
        case jobConstants.DELETE_JOB_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(job => job._id !== action.id)
            };
        case jobConstants.DELETE_JOB_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(job => {
                    if (job._id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = job;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }
                    return job;
                })
            };
        case jobConstants.UPDATE_JOB_REQUEST:
            return {
                ...state,
                items: state.items.map(job =>
                  action.job._id === job._id
                    ? {...job, updating: true}
                    : job
                )
            };
        case jobConstants.UPDATE_JOB_SUCCESS:
            return {
                ...state,
                items: state.items.map(job =>
                  action.job._id === job._id
                    ? action.job
                    : job
                )
            };
        case jobConstants.UPDATE_JOB_FAILURE:
            return {
                ...state,
                items: state.items.map(job => {
                    if (job._id === action.job._id) {
                        // make copy of user without 'deleting:true' property
                        const { updating, ...userCopy } = job;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, updateError: action.error };
                    }
                    return job;
                })
            };
        default:
            return state
    }
}