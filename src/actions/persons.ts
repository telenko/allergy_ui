import type { PersonI } from '../types/persons';

export enum PERSONS {
    FETCH_SUCCESS = "FETCH_PERSONS_SUCCESS",
    FETCH_START = "FETCH_PERSONS_START",
    FETCH_FAILED = "FETCH_PERSONS_FAILED"
}

export interface PersonsFetchStart {
    type: PERSONS.FETCH_START
}

export interface PersonsFetchSuccess {
    type: PERSONS.FETCH_SUCCESS,
    payload: PersonI[]
}

export interface PersonsFetchFailure {
    type: PERSONS.FETCH_FAILED,
    payload: Error
}

export type PersonAction = PersonsFetchStart | PersonsFetchSuccess | PersonsFetchFailure;

export const getPersonsSuccessAction = (persons: PersonI[]): PersonsFetchSuccess => {
    return {
        type: PERSONS.FETCH_SUCCESS,
        payload: persons
    };
}

export const getPersonsFailureAction = (error: Error): PersonsFetchFailure => {
    return {
        type: PERSONS.FETCH_FAILED,
        payload: error
    };
}

export const getPersonsStartAction = (): PersonsFetchStart => {
    return {
        type: PERSONS.FETCH_START
    };
}