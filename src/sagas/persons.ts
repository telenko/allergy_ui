import { call, cancelled, put, take } from 'redux-saga/effects';
import { PERSONS, getPersonsSuccessAction, getPersonsFailureAction } from '../actions/persons';
import { fetchPersons } from '../api/persons';

const personsFetchSaga = function*() {
    while (true) {
        yield take(PERSONS.FETCH_START);
        try {
            const persons = yield call(fetchPersons);
            yield put(getPersonsSuccessAction(persons));
        } catch (e) {
            yield put(getPersonsFailureAction(e));
        } finally {
            if (yield cancelled()) {
                console.log("cancelling");
            }
        }
    }
}

export default personsFetchSaga;