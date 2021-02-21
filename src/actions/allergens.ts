import type { AllergenI } from '../types';

export enum ALLERGENS {
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_START = "FETCH_START",
    FETCH_FAILED = "FETCH_FAILED"
}

export interface AllergensFetchStart {
    type: ALLERGENS.FETCH_START
}

export interface AllergensFetchSuccess {
    type: ALLERGENS.FETCH_SUCCESS,
    payload: AllergenI[]
}

export interface AllergensFetchFailure {
    type: ALLERGENS.FETCH_FAILED,
    payload: Error
}

export type AllergenAction = AllergensFetchStart | AllergensFetchFailure | AllergensFetchSuccess;

export const getAllergensSuccessAction = (allergens: AllergenI[]): AllergensFetchSuccess => {
    return {
        type: ALLERGENS.FETCH_SUCCESS,
        payload: allergens
    };
}

export const getAllergensFailureAction = (error: Error): AllergensFetchFailure => {
    return {
        type: ALLERGENS.FETCH_FAILED,
        payload: error
    };
}

export const getAllergensStartAction = (): AllergensFetchStart => {
    return {
        type: ALLERGENS.FETCH_START
    };
}