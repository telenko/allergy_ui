export interface GuiState {
    pageSize: number
    alertTimeout: number
}

const INITIAL_STATE: GuiState = {
    pageSize: 20,
    alertTimeout: 3000
}

export const gui = (state: GuiState=INITIAL_STATE, action: any): GuiState => {
    return state;
}