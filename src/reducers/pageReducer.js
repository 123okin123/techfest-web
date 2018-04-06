//@flow
import {pageConstants, type Action} from '../constants'

export type Pages = {
    +[string]: {
        +isFetching: false,
        +id: string,
        +slug: string,
        +response: string
    }
}


export function pages(state: Pages = {}, action: Action) :Pages {
    switch (action.type) {
        case pageConstants.PAGE_REQUEST:
            return {
                ...state,
                [action.id]:{
                    isFetching: true
                }
            };
        case pageConstants.PAGE_SUCCESS:
            return {
                ...state,
                [action.id]: {
                    isFetching: false,
                    response: action.response
                }
            };
        case pageConstants.PAGE_FAILURE:
            return {
                ...state,
                [action.id]: {
                    isFetching: false,
                    response: action.error
                }
            };
        default:
            return state
    }
}

