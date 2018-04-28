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



export type User = {
    firstName: string,
    lastName: string,
    email: string,
    password?: string,

    participantsFields: {
        status?: string,
        applicationFileKey: string,
        applicationFile?: string,
        nationality: string,
        residence: {
            address: string,
            city: string,
            zipCode: string,
            country: string,
        },
        phone: string,
        dateOfBirth: Date,
        gender: string,
        hasProjectIdea: boolean,
        bestDescription: string,
        profession: string,
        latestDegree: string,
        socialProfileLink?: boolean,
        whyChoose: string,
        needsAccommodation: boolean,
        jobSeeking: boolean,
        informEvents: string,
        informEventsDoubleOptInToken: string,
        informEventsDoubleOptIn: boolean,
        howHearAbout: string,
        howHearAboutOther: string,
    },

    token?: string
}



