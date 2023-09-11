import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';
import milliseconds from 'src/utils/milliseconds';

const SELECTORS = {
    NEXT_BUTTON: 'widget_grid_widget_data-table_table-header_next-button-menu-{direction}',
    NEXT_BUTTON_LEFT: 'widget_grid_widget_data-table_table-header_next-button-menu-left',
    COLUMN_HEADER: 'widget_grid_widget_data-table_table-header_column-header-{title}_{sort}',
};

const NEXT_BUTTON_DIRECTIONS = {
    LEFT: 'left',
    RIGHT: 'right',
};

const NextButton = direction => element(cookTestID(SELECTORS.NEXT_BUTTON, { direction }));

async function clickNextRight() {
    await NextButton(NEXT_BUTTON_DIRECTIONS.RIGHT).clickElement();
}

async function clickNextLeft() {
    await NextButton(NEXT_BUTTON_DIRECTIONS.LEFT).clickElement();
}

function ColumnHeader(title, sorted = false, isDescending = false) {
    const sortValue = isDescending ? 'desc' : 'ask';

    const testID = cookTestID(SELECTORS.COLUMN_HEADER, {
        title,
        sort: sorted ? sortValue : 'not sorted',
    });
    return element(testID);
}

//TODO: Add validation of current sort
async function clickNextUntilColumnHeaderDisplayed(title, direction) {
    const neededColumnHeader = ColumnHeader(title);
    const nextDirection =
        direction === NEXT_BUTTON_DIRECTIONS.RIGHT ? clickNextRight : clickNextLeft;

    let isVisible = false;
    while (!isVisible) {
        const currentState = await neededColumnHeader.isElementDisplayed({
            timeout: milliseconds.seconds(3),
        });
        if (currentState) {
            isVisible = true;
            return neededColumnHeader;
        }
        await nextDirection();
    }
}

const TableHeader = { clickNextUntilColumnHeaderDisplayed };
export { NEXT_BUTTON_DIRECTIONS };
export default TableHeader;
