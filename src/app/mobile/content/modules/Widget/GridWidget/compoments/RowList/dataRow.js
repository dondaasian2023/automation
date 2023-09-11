import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';

const SELECTOR = 'widget_grid_widget_row_list-card_{cardTitle}_{index}';

const DataRow = (cardTitle, index = 0) =>
    element(cookTestID(SELECTOR, { cardTitle, index: index.toString() }));

export default DataRow;
