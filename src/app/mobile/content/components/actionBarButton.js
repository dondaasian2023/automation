import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';

const SELECTOR = 'core_action-bar-item_{label}';

export const LABEL = {
    CANCEL: 'Cancel',
    SAVE: 'Save',
    SUBMIT: 'Submit',
    DONE: 'Done',
    VIEW_ENTRY: 'View Entry',
    ADD_NEW: 'Add New',
    CLOSE: 'Close',
};

export default function ActionBarButton(label) {
    return element(cookTestID(SELECTOR, { label }));
}
