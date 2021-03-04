import { combineReducers } from 'redux';
import { allergens, AllergenState } from './allergens';
import { incidents, IncidentState } from './incidents';
import { gui, GuiState } from './gui';
import { persons, PersonState } from './persons';

export interface RootState {
    allergens: AllergenState,
    gui: GuiState,
    incidents: IncidentState,
    persons: PersonState
}

const rootReducer = combineReducers({
    persons,
    allergens,
    gui,
    incidents
});

export default rootReducer;