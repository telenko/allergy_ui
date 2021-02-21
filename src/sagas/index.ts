import { fork } from 'redux-saga/effects';
import allergensSaga from './allergens';

export default function*() {
    yield fork(allergensSaga);
};