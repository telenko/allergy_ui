import { call, cancelled, put, take } from 'redux-saga/effects';
import { ALLERGENS, getAllergensSuccessAction, getAllergensFailureAction } from '../actions';
import { fetchAllergens } from '../api';

const allergensSaga = function*() {
    while (true) {
        yield take(ALLERGENS.FETCH_START);
        try {
            const allergens = yield call(fetchAllergens);
            yield put(getAllergensSuccessAction(allergens));
        } catch (e) {
            yield put(getAllergensFailureAction(e));
        } finally {
            if (yield cancelled()) {
                console.log("cancelling");
            }
        }
    }
}

export default allergensSaga;