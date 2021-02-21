import type { AllergenI } from '../../types';
import { TableToolbar, useToolsLocales } from '../TableToolbar/TableToolbar';
import { TableProgressBar } from '../TableProgressBar/TableProgressBar';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import { Add } from '@material-ui/icons';
import { useIntl } from 'react-intl';

const useColumns = ():ColDef[] => {
    const intl = useIntl();

    return [
        {
            field: 'name',
            headerName: intl.messages.name as string,
            flex: 2
        },
        {
            field: 'impactStartDelay',
            headerName: intl.messages.impactStartDelay as string,
            flex: 1
            // valueGetter: params => {}
        },
        {
            field: 'impactDuration',
            headerName: intl.messages.impactDuration as string,
            flex: 1
        },
        {
            field: 'isAccumulative',
            headerName: intl.messages.isAccumulative as string,
            flex: 1,
            renderCell: (params) => params.value ? <Add/> : <span></span>
        },
        {
            field: 'priority',
            headerName: intl.messages.priority as string,
            flex: 1
        },
        // {
            //     field: 'fullName',
            //     headerName: 'Full name',
            //     description: 'This column has a value getter and is not sortable.',
            //     sortable: false,
            //     width: 160,
            //     valueGetter: (params) =>
            //       `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
            //   },
    ];
}

interface AllergenListProps {
    onRefresh: ()=>void,
    allergens: AllergenI[],
    pageSize: number,
    isPending: boolean
}

const AllergenList: React.FC<AllergenListProps> = ({onRefresh, allergens, pageSize, isPending}) => {
    const columns = useColumns();
    const intl = useIntl();
    const toolsLocales = useToolsLocales();
    return <div style={{height: '100%', width: '100%'}}>
               <DataGrid
                    columns={columns}
                    autoHeight
                    rows={allergens}
                    pageSize={pageSize}
                    getRowId={row => row._id}
                    checkboxSelection
                    loading={isPending}
                    components={{
                        LoadingOverlay: TableProgressBar,
                        Toolbar: () => <TableToolbar onRefresh={onRefresh}/>
                    }}
                    localeText={{
                        noRowsLabel: (intl.messages.noData as string || ""),
                        ...toolsLocales
                    }}/>
           </div>
};

export default AllergenList;