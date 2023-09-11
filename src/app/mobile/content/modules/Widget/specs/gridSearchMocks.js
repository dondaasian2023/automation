import { OPERATORS } from 'src/app/mobile/content/modules/Filters/filterEditorPage';

export const GRID_SEARCH_MOCKS = {
    FILTER_BY_OPERATOR_VALUE: {
        FILTER: {
            FILTER_BY: 'choice multi',
            OPERATOR: OPERATORS.EQUALS,
            VALUE: '3',
        },
        FOUNDED_ITEMS: ['Jjj', 'Hhh'],
    },
    FILTER_BY_OPERATOR: {
        FILTER: {
            FILTER_BY: 'img',
            OPERATOR: 'Has Image',
        },
        FOUNDED_ITEMS: ['name edit', 'name2', 'name'],
    },
};

export const DASHBOARD_NAME = 'Grid Search';
