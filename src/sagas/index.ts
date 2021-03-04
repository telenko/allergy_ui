import { fork } from 'redux-saga/effects';
import allergensSaga from './allergens';
import incidentsSaga from './incidents';
import personsSaga from './persons';

export default function*() {
    yield fork(allergensSaga);
    yield fork(incidentsSaga);
    yield fork(personsSaga);
};