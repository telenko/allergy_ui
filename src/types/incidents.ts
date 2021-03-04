export interface StateI {
    _id: string
    name: string
    point: number
    type: string
}

export interface StateTypeI {
    _id: string
    name: string
}

export interface IncidentI {
    _id?: string
    tags: string[]
    name: string
    states: StateI[]
    dateStart: Date | null
    person: string
    type: string
}

export interface IncidentTypeI {
    name: string;
    _id: string;
}