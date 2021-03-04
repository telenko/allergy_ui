import type { IncidentI, StateTypeI } from "../../types";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import type { FormikProps } from 'formik';
import type { PersonI } from "../../types/persons";
import StateTypePicker, { useAvailableStateTypes, useStateTypes } from "./StateTypePicker";
import { CircularProgress } from '@material-ui/core';
import { useIntl } from "react-intl";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));


const IncidentCreateForm: React.FC<{ preparePending: boolean, form: FormikProps<IncidentI>, persons: PersonI[], stateTypes: StateTypeI[] }> = ({ preparePending, form, persons, stateTypes }) => {
    const classes = useStyles();
    const [selectedTypes, setSelectedTypes] = useStateTypes(form);
    const availableStateTypes = useAvailableStateTypes(stateTypes, selectedTypes);
    const intl = useIntl();
    if (preparePending) {
        return <CircularProgress/>
    }
    return <form className={classes.container} onSubmit={form.handleSubmit} noValidate autoComplete="off">
        <div>
            <TextField name="dateStart"
                label={intl.messages.dateTimeStarted}
                type="datetime-local"
                value={form.values.dateStart || ''}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!(form.errors.dateStart && form.touched.dateStart)}
                helperText={(form.errors.dateStart && form.touched.dateStart) && form.errors.dateStart}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal" />
            <TextField name="person"
                label={intl.messages.person}
                type="text"
                select
                value={form.values.person || ''}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={!!(form.errors.person && form.touched.person)}
                helperText={(form.errors.person && form.touched.person) && form.errors.person}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal">
                {persons.map(person => (
                    <MenuItem key={person._id} value={person._id}>
                        {person.name} {person.lastName}
                    </MenuItem>
                ))}
            </TextField>
            <StateTypePicker
                onChange={value => setSelectedTypes(value)}
                availableStateTypes={availableStateTypes}
                selectedStateTypes={selectedTypes} />
            {form.values.states.map((state, idx) => (
                <Grid key={state.name + state.type}>
                    {form.values.states[idx]?.name}
                    <Slider
                        defaultValue={10}
                        name={`states[${idx}].point`}
                        value={form.values.states[idx]?.point || 0}
                        onChange={(e, v) => {
                            form.setFieldValue(`states[${idx}].point`, v, false);
                        }}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={5}
                        marks
                        min={0}
                        max={100}
                    />
                </Grid>
            ))}
            <Button type="submit" disabled={form.isSubmitting}>{intl.messages.submit}</Button>
        </div>
    </form>
}

export default IncidentCreateForm;