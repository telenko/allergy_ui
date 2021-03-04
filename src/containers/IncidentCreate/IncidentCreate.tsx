import IncidentCreateForm from "../../components/IncidentCreateForm/IncidentCreateForm";
import { useFormik } from 'formik';
import type { IncidentI, StateTypeI } from "../../types";
import { IncidentCreateValidator } from '../../validators/IncidentValidator';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { PersonI } from "../../types/persons";
import { useEffect } from "react";
import { getIncidentCreateAction, getTypesFetchStartAction } from "../../actions";
import { getPersonsStartAction } from "../../actions/persons";

const IncidentCreate: React.FC = () => {
    const stateTypes: StateTypeI[] = useSelector<RootState, StateTypeI[]>(state => state.incidents.typesList);
    const persons: PersonI[] = useSelector<RootState, PersonI[]>(state => state.persons.list);
    const isFetchPending: boolean = useSelector<RootState, boolean>(state => state.persons.pending || state.incidents.typesListPending);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypesFetchStartAction());
        dispatch(getPersonsStartAction());
    }, []);
    const formik = useFormik<IncidentI>({
        initialValues: {
            name: '',
            dateStart: null,
            person: '',
            states: [],
            tags: [],
            type: ''
        },
        validationSchema: IncidentCreateValidator,
        onSubmit: (values: IncidentI) => {
            dispatch(getIncidentCreateAction(values));
        }
    });
    return <>
        <IncidentCreateForm form={formik} preparePending={isFetchPending} persons={persons} stateTypes={stateTypes}/>
    </>
};

export default IncidentCreate;