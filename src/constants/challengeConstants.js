

//@flow

export const challengeConstants = {
    GET_CHALLENGES_REQUEST : 'GET_CHALLENGES_REQUEST',
    GET_CHALLENGES_SUCCESS : 'GET_CHALLENGES_SUCCESS',
    GET_CHALLENGES_FAILURE : 'GET_CHALLENGES_FAILURE',
};

export type Challenge = {
    +_id: string,
    +name: string,
    +track: string
}


export type ChallengeAction =
  { type: 'GET_CHALLENGES_REQUEST' }
  | { type: 'GET_CHALLENGES_SUCCESS', challenges: Array<Challenge> }
  | { type: 'GET_CHALLENGES_FAILURE', error: string }




