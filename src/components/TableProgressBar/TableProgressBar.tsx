import { GridOverlay } from '@material-ui/data-grid';
import { LinearProgress } from '@material-ui/core';

export const TableProgressBar: React.FC = () => {
    return (
      <GridOverlay>
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
}