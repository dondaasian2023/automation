import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';

const SELECTOR = `feature_components-live_search_item-{name}_{field1Value}_{field2Value}`;
const EMPTY_VALUE_TEST_ID = 'empty-field';

const didYouMean = async ({ name, field1Value, field2Value }) => {
    const testID = cookTestID(SELECTOR, {
        name,
        field1Value: field1Value ?? EMPTY_VALUE_TEST_ID,
        field2Value: field2Value ?? EMPTY_VALUE_TEST_ID,
    });
    return element(testID);
};

const LiveTypeSearchResults = {
    didYouMean,
};

export default LiveTypeSearchResults;
