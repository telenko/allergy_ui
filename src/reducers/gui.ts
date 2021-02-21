export interface GuiState {
    pageSize: number
}

const INITIAL_STATE: GuiState = {
    pageSize: 20
}

export const gui = (state: GuiState=INITIAL_STATE, action: any): GuiState => {
    return state;
}