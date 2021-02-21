import { GridToolbarContainer, FilterToolbarButton, LocaleText } from '@material-ui/data-grid';
import { IconButton } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { useIntl } from 'react-intl';

export const useToolsLocales = (): Partial<LocaleText> => {
    const intl = useIntl();
    
    return {
        toolbarFilters: (intl.messages.toolbarFilters as string || ""),
        toolbarFiltersLabel: (intl.messages.toolbarFiltersLabel as string || ""),
        toolbarFiltersTooltipHide: (intl.messages.toolbarFiltersTooltipHide as string || ""),
        toolbarFiltersTooltipShow: (intl.messages.toolbarFiltersTooltipShow as string || ""),
        toolbarFiltersTooltipActive: () => (intl.messages.toolbarFiltersTooltipActive as string || ""),
        filterOperatorContains: (intl.messages.filterOperatorContains as string || ""),
        filterOperatorEquals: (intl.messages.filterOperatorEquals as string || ""),
        filterOperatorStartsWith: (intl.messages.filterOperatorStartsWith as string || ""),
        filterOperatorEndsWith: (intl.messages.filterOperatorEndsWith as string || "")
    };
};

export const TableToolbar: React.FC<{ onRefresh: ()=>void }> = ({onRefresh}) => {
    return <GridToolbarContainer>
                <IconButton color="primary" size="small" aria-label="refresh" onClick={onRefresh}>
                    <Refresh/>
                </IconButton>
                <FilterToolbarButton/>
            </GridToolbarContainer>
}
