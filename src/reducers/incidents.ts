import type { IncidentI, StateTypeI } from '../types';
import { INCIDENTS, IncidentAction, TypeAction } from '../actions';

export interface IncidentState {
    list: IncidentI[],
    listPending: boolean,
    listError: Error | null,
    createdIncident: IncidentI | null,
    createPending: boolean,
    createError: Error | null,

    typesList: StateTypeI[],
    typesListPending: boolean,
    typesListError: Error | null,
}

const INITIAL_STATE: IncidentState = {
    list: [],
    listPending: false,
    listError: null,
    createPending: false,
    createError: null,
    createdIncident: null,

    typesList: [],
    typesListPending: false,
    typesListError: null
};

export const incidents = (state: IncidentState = INITIAL_STATE, action: IncidentAction | TypeAction): IncidentState => {
    switch (action.type) {
        case INCIDENTS.CREATE: {
            return {
                ...state,
                createPending: true,
                createdIncident: action.payload
            }
        }
        case INCIDENTS.CREATE_SUCCESS: {
            return {
                ...state,
                createPending: false,
                createError: null
            }
        }
        case INCIDENTS.CREATE_FAILED: {
            return {
                ...state,
                createPending: false,
                createError: action.payload
            }
        }
        case INCIDENTS.FETCH_TYPES: {
            return {
                ...state,
                typesListPending: true
            };
        }
        case INCIDENTS.FETCH_TYPES_SUCCESS: {
            return {
                ...state,
                typesListError: null,
                typesListPending: false,
                typesList: action.payload
            };
        }
        case INCIDENTS.FETCH_TYPES_FAILED: {
            return {
                ...state,
                typesListPending: false,
                typesListError: action.payload
            }
        }
        default: {
            return state;
        }
    }
}