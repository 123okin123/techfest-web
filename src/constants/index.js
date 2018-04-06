//@flow
export * from './alertConstants';
export * from './userConstants';
export * from './pageConstants';
export * from './uploadConstants';
export * from './contactConstants';

export type Action =
    | { type: 'USERS_LOGIN_REQUEST', user: {} }
    | { type: 'USERS_LOGIN_SUCCESS', user: {} }
    | { type: 'USERS_LOGIN_FAILURE', error: string }
    | { type: 'USERS_LOGOUT' }
    | { type: 'USERS_REGISTER_REQUEST', user: {} }
    | { type: 'USERS_REGISTER_SUCCESS', user: {} }
    | { type: 'USERS_REGISTER_FAILURE', error: string }
    | { type: 'USERS_DELETE_REQUEST', id: string }
    | { type: 'USERS_DELETE_SUCCESS', id: string }
    | { type: 'USERS_DELETE_FAILURE', id: string, error: string }

    | { type: 'PAGE_REQUEST', id: string }
    | { type: 'PAGE_SUCCESS', id: string, response: {} }
    | { type: 'PAGE_FAILURE', id: string, error: string }

    | { type: 'UPLOAD_REQUEST' }
    | { type: 'UPLOAD_SUCCESS', key: string }
    | { type: 'UPLOAD_FAILURE', error: string }

    | { type: 'ALERT_SUCCESS', message: string }
    | { type: 'ALERT_ERROR', message: string }
    | { type: 'ALERT_CLEAR' }

    | {type: 'CONTACT_REQUEST'}
    | {type: 'CONTACT_SUCCESS'}
    | {type: 'CONTACT_FAILURE', error: string}

