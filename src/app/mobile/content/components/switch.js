import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';

const SELECTOR = 'components_switch-{label}';

export default function Switch(label) {
    const testId = cookTestID(SELECTOR, { label });
    return element(testId);
}
