//@flow

import {type Challenge, type Action, challengeConstants} from '../constants'


export type ChallengeState = {
    challenges: Array<Challenge>,
    fetchingState: {
        fetching?: boolean,
        error?: string,
        success?: boolean
    }
}

const initialState :ChallengeState = {
    challenges: [],
    fetchingState: {}
};

export function challenge(state: ChallengeState = initialState, action: Action) :ChallengeState{
    switch (action.type) {
        case challengeConstants.GET_CHALLENGES_REQUEST:
            return {fetchingState: {fetching: true}, challenges: []};
        case challengeConstants.GET_CHALLENGES_SUCCESS:
            return {fetchingState: {success: true}, challenges: action.challenges};
        case challengeConstants.GET_CHALLENGES_FAILURE:
            return {fetchingState: {error: action.error}, challenges: []};
        default:
            return state
    }
}