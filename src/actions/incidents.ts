import type { IncidentI, StateTypeI } from '../types/index'

export enum INCIDENTS {
    CREATE = "CREATE",
    CREATE_SUCCESS = "CREATE_SUCCESS",
    CREATE_FAILED = "CREATE_FAILURE",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_START = "FETCH_START",
    FETCH_FAILED = "FETCH_FAILED",

    FETCH_TYPES = "FETCH_TYPES",
    FETCH_TYPES_SUCCESS = "FETCH_TYPES_SUCCESS",
    FETCH_TYPES_FAILED = "FETCH_TYPES_FAILED"
}

interface IncidentCreateAction {
    type: INCIDENTS.CREATE,
    payload: IncidentI
}

interface IncidentCreateSuccessAction {
    type: INCIDENTS.CREATE_SUCCESS
}

interface IncidentCreateFailureAction {
    type: INCIDENTS.CREATE_FAILED
    payload: Error
}

interface FetchTypesStart {
    type: INCIDENTS.FETCH_TYPES
}

interface FetchTypesSuccess {
    type: INCIDENTS.FETCH_TYPES_SUCCESS,
    payload: StateTypeI[]
}

interface FetchTypesFailure {
    type: INCIDENTS.FETCH_TYPES_FAILED,
    payload: Error
}

export type IncidentAction = IncidentCreateAction | IncidentCreateSuccessAction | IncidentCreateFailureAction;

export type TypeAction = FetchTypesStart | FetchTypesSuccess | FetchTypesFailure;

export const getIncidentCreateAction = (incident: IncidentI): IncidentCreateAction => {
    return {
        type: INCIDENTS.CREATE,
        payload: incident
    };
}

export const getIncidentCreateSuccessAction = (): IncidentCreateSuccessAction => {
    return {
        type: INCIDENTS.CREATE_SUCCESS
    };
}

export const getIncidentCreateFailureAction = (e: Error): IncidentCreateFailureAction => {
    return {
        type: INCIDENTS.CREATE_FAILED,
        payload: e
    };
}

export const getTypesFetchSuccessAction = (types: StateTypeI[]): FetchTypesSuccess => {
    return {
        type: INCIDENTS.FETCH_TYPES_SUCCESS,
        payload: types
    };
}

export const getTypesFetchFailureAction = (error: Error): FetchTypesFailure => {
    return {
        type: INCIDENTS.FETCH_TYPES_FAILED,
        payload: error
    };
}

export const getTypesFetchStartAction = (): FetchTypesStart => {
    return {
        type: INCIDENTS.FETCH_TYPES
    };
}