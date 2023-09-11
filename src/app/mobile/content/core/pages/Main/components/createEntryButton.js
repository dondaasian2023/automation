import element from 'src/element';

const SELECTORS = {
    CREATE_ENTRY_BUTTON: {
        PLUS_BUTTON: '~components_create-entry-button_plus-button',
        ENTRY_FORM_BUTTON: '~components_create-entry-button_entry-form-button',
    },
};

const entryFormButton = () => element(SELECTORS.CREATE_ENTRY_BUTTON.ENTRY_FORM_BUTTON);

const plusButton = () => element(SELECTORS.CREATE_ENTRY_BUTTON.PLUS_BUTTON);

const CreateEntryButton = { plusButton, entryFormButton };
export default CreateEntryButton;
