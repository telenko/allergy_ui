import { call, cancelled, fork, put, take } from 'redux-saga/effects';
import { INCIDENTS, 
    getIncidentCreateSuccessAction, getIncidentCreateFailureAction,
    getTypesFetchFailureAction, getTypesFetchSuccessAction } from '../actions';
import { createIncident, fetchTypes } from '../api/incidents';

const createIncidentSaga = function*() {
    while (true) {
        const action = yield take(INCIDENTS.CREATE);
        try {
            yield call(createIncident, action.payload);
            yield put(getIncidentCreateSuccessAction());
        } catch (e) {
            yield put(getIncidentCreateFailureAction(e));
        } finally {
            if (yield cancelled()) {
                console.log("cancelling");
            }
        }
    }
}

const fetchTypesSaga = function*() {
    while (true) {
        yield take(INCIDENTS.FETCH_TYPES);
        try {
            const types = yield call(fetchTypes);
            yield put(getTypesFetchSuccessAction(types));
        } catch (e) {
            yield put(getTypesFetchFailureAction(e));
        } finally {
            if (yield cancelled()) {
                console.log("cancelling");
            }
        }
    }
}

export default function*() {
    yield fork(createIncidentSaga);
    yield fork(fetchTypesSaga);
};