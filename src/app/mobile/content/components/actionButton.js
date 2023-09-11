import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';

const SELECTOR = 'components_action-button-{label}';

export default function ActionButton(label) {
    const testID = cookTestID(SELECTOR, { label });
    return element(testID);
}
