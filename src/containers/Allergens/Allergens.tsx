import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../../reducers';
import AllergenList from '../../components/AllergenList/AllergenList';
import { AllergenI } from "../../types";
import { getAllergensStartAction } from '../../actions';

import { Grid, Container, CssBaseline, IconButton, Paper, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { useIntl } from "react-intl";
import { useCallback, useEffect } from "react";

const Allergens: React.FC<{}> = () => {
    const allergens: AllergenI[] = useSelector<RootState, AllergenI[]>(state => state.allergens.list);
    const isPending: boolean = useSelector<RootState, boolean>(state => state.allergens.pending);
    const pageSize: number = useSelector<RootState, number>(state => state.gui.pageSize);
    const dispatch = useDispatch();
    const intl = useIntl();
    
    const loadAllergens = useCallback(() => {
        dispatch(getAllergensStartAction());
    }, []);

    useEffect(() => {
        loadAllergens();
    }, []);

    return <Container>
                <CssBaseline/>
                <Paper>
                    <Grid
                        container
                        direction="row"                        
                        justify="flex-start"
                        alignItems="center">
                    </Grid>
                    <AllergenList onRefresh={loadAllergens} allergens={allergens} pageSize={pageSize} isPending={isPending}/>
                </Paper>
            </Container>
};

export default Allergens;