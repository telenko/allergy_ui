import { combineReducers } from 'redux';
import { allergens, AllergenState } from './allergens';
import { gui, GuiState } from './gui';

export interface RootState {
    allergens: AllergenState,
    gui: GuiState
}

const rootReducer = combineReducers({
    allergens,
    gui
});

export default rootReducer;