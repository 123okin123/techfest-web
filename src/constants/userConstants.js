//@flow

export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    UPLOAD_REGISTER_REQUEST: 'UPLOAD_USERS_REGISTER_REQUEST',
    UPLOAD_REGISTER_SUCCESS: 'UPLOAD_USERS_REGISTER_SUCCESS',
    UPLOAD_REGISTER_FAILURE: 'UPLOAD_USERS_REGISTER_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    LOGOUT: 'USERS_LOGOUT',

    GET_INFO_REQUEST: 'GET_INFO_REQUEST',
    GET_INFO_SUCCESS: 'GET_INFO_SUCCESS',
    GET_INFO_FAILURE: 'GET_INFO_FAILURE',

    UPDATE_INFO_REQUEST: 'UPDATE_INFO_REQUEST',
    UPDATE_INFO_SUCCESS: 'UPDATE_INFO_SUCCESS',
    UPDATE_INFO_FAILURE: 'UPDATE_INFO_FAILURE',
};


export type UserAction =
  | { type: 'USERS_REGISTER_REQUEST', user: User }
  | { type: 'USERS_REGISTER_SUCCESS', user: User }
  | { type: 'USERS_REGISTER_FAILURE', error: string }

  | { type: 'UPLOAD_USERS_REGISTER_REQUEST', user: User }
  | { type: 'UPLOAD_USERS_REGISTER_SUCCESS', user: User }
  | { type: 'UPLOAD_USERS_REGISTER_FAILURE', error: string }
  
  | { type: 'USERS_LOGIN_REQUEST' }
  | { type: 'USERS_LOGIN_SUCCESS', user: User }
  | { type: 'USERS_LOGIN_FAILURE', error: string }
  
  | { type: 'USERS_LOGOUT' }

  | { type: 'GET_INFO_REQUEST' }
  | { type: 'GET_INFO_SUCCESS', user: User }
  | { type: 'GET_INFO_FAILURE', error: string }

  | { type: 'UPDATE_INFO_REQUEST' }
  | { type: 'UPDATE_INFO_SUCCESS', user: User }
  | { type: 'UPDATE_INFO_FAILURE', error: string }
  






export const roles = {
    PARTICIPANT_ROLE : 'PARTICIPANT',
    ADMIN_ROLE : 'ADMIN',
    PARTNER_ROLE: 'PARTNER',
    STARTUP_ROLE: 'STARTUP',
    TRACK_PARTNER_ROLE: 'TRACK_PARTNER',
    CHALLENGE_PARTNER_ROLE: 'CHALLENGE_PARTNER',
    TECHNOLOGY_PARTNER_ROLE: 'TECHNOLOGY_PARTNER',
    ECOSYSTEM_PARTNER_ROLE: 'ECOSYSTEM_PARTNER'
};

export const allPartnerRoles = [
    roles.PARTNER_ROLE,
    roles.CHALLENGE_PARTNER_ROLE,
    roles.ECOSYSTEM_PARTNER_ROLE,
    roles.TECHNOLOGY_PARTNER_ROLE,
    roles.TRACK_PARTNER_ROLE
];



export type User = {
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    token?: string,
    role: string,
    partnerFields?: {
        company: string,
        guests?: Array<{
            firstName: string,
            lastName: string,
            email: string,
            numberOfDays: number
        }>
    },
    participantFields?: {},
    startupFields?: {},
    applicantFields?: {},
}



