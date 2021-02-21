import type { AllergenI } from '../../types';
import { Card, CardContent, Typography } from '@material-ui/core';

interface AllergenProps extends AllergenI {
    
}

const Allergen: React.FC<AllergenProps> = ({ name }) => (
    <Card>
        <CardContent>
            <Typography>{name}</Typography>
        </CardContent>
    </Card>
);

export default Allergen;