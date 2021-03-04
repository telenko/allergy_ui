import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import type { FormikProps } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import type { IncidentI, StateTypeI } from '../../types';

export type StateTypeOption = {
    label: string;
    value: string;
};

export const useStateTypes = (form: FormikProps<IncidentI>):[StateTypeOption[], (v: (string | StateTypeOption)[])=>void] => {
    const [selectedTypes, setSelectedTypes] = useState<StateTypeOption[]>([]);
    useEffect(() => {
        const currentStates = form.values.states || [];
        form.setFieldValue('states', selectedTypes.map(type => {
            const existingValue = currentStates.find(state => {
                if (!type.value) {
                    return state.name === type.label;
                }
                return state.type === type.value;
            });
            if (existingValue) {
                return existingValue;
            }
            return {
                point: 0,
                name: type.label,
                type: type.value
            }
        }));
    }, [selectedTypes]);
    const updateStateTypes = useCallback((typesOptions: (string | StateTypeOption)[]) => {
        setSelectedTypes(typesOptions.map(item => {
            if (typeof item === 'string') {
                return {
                    label: item,
                    value: ''
                };
            }
            return item;
        }));
    }, []);
    return [selectedTypes, updateStateTypes];
};

export const useAvailableStateTypes = (availableStateTypes: StateTypeI[], selectedStateTypes: StateTypeOption[]): StateTypeOption[] => {
    const availableStateTypesR = useMemo(() => {
        return availableStateTypes
            .filter(stateType => {
                return !selectedStateTypes
                        .filter(selectedType => !!selectedType.value)
                        .find(selectedType => selectedType.value === stateType._id);
            })
            .map(type => {
                return {
                    value: type._id,
                    label: type.name
                }
            })
    }, [availableStateTypes, selectedStateTypes]);
    return availableStateTypesR;
}

type StateTypePickerProps = { selectedStateTypes: StateTypeOption[], availableStateTypes: StateTypeOption[], onChange: (v: (string | StateTypeOption)[])=>void };

const StateTypePicker: React.FC<StateTypePickerProps> = ({ selectedStateTypes, availableStateTypes, onChange }) => {
    const intl = useIntl();
    return <Autocomplete
        multiple
        id="tags-outlined"
        options={availableStateTypes}
        freeSolo
        value={selectedStateTypes || []}
        getOptionLabel={option => option.label || ""}
        onChange={(e, value) => {
            onChange(value);
        }}
        filterSelectedOptions
        renderInput={(params) => (
            <TextField
                {...params}
                variant="outlined"
                label={intl.messages.states}
                placeholder={intl.messages.selectMultipleStates + ""}
            />
        )}
    />
};

export default StateTypePicker;