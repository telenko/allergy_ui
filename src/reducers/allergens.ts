import type { AllergenI } from '../types';
import type { AllergenAction } from '../actions';
import { ALLERGENS } from '../actions';

export interface AllergenState {
    list: AllergenI[],
    pending: boolean,
    error: Error | null
}

const initialState: AllergenState = {
    list: [],
    pending: false,
    error: null
}

export const allergens = (state:AllergenState=initialState, action: AllergenAction): AllergenState => {
    switch (action.type) {
        case ALLERGENS.FETCH_START: {
            return {
                ...state,
                pending: true
            };
        }
        case ALLERGENS.FETCH_SUCCESS: {
            return {
                ...state,
                error: null,
                pending: false,
                list: action.payload
            };
        }
        case ALLERGENS.FETCH_FAILED: {
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}