import { cookTestID } from 'src/services/cookTestID';
import element from 'src/element';
import BottomActionButton from 'src/app/mobile/content/components/bottomActionButton';

export const OPERATORS = {
    EQUALS: 'Equals',
};

const SELECTORS = {
    LINE_ITEM: 'filters_mobile-filter-control-factory_line_line-item-{operator}',
    ENTER_KEYWORD_INPUT: '~filters_mobile-filter-control-factory_input-row-keyword',
};

async function selectOperator(operator) {
    const testID = cookTestID(SELECTORS.LINE_ITEM, { operator });
    await element(testID).clickElement();
}

async function enterKeyWord(keyword) {
    await element(SELECTORS.ENTER_KEYWORD_INPUT, 'ENTER KEYWORD').setValue(keyword);
}

const FilterEditorPage = {
    selectOperator,
    enterKeyWord,
    saveFilter: async () => await BottomActionButton().clickElement(),
};

export default FilterEditorPage;
