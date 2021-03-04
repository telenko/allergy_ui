import * as yup from 'yup';
import type { IncidentI, StateI } from '../types';
import type { SchemaType } from './common';

const stateCreateSchema: SchemaType<StateI> = {
    name: yup.string().when("type", {
        is: (type: string) => !type,
        then: yup.string().required(),
        otherwise: yup.string().optional(),
    }),
    point: yup.number().required().min(0).max(100).integer(),
    type: yup.string().optional()
};

const incidentCreateSchema: SchemaType<IncidentI> = {
    dateStart: yup.date().required(),
    person: yup.string().required(),
    states: yup.array().required().min(1).of(yup.object().shape(stateCreateSchema)).required()
};


export const IncidentCreateValidator = yup.object().shape(incidentCreateSchema);