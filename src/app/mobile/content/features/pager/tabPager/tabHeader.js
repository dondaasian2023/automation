import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';

const SELECTOR = 'open_content_components_tabs-button-{label}';

export default function TabHeader(label) {
    const testID = cookTestID(SELECTOR, { label });
    return element(testID);
}
