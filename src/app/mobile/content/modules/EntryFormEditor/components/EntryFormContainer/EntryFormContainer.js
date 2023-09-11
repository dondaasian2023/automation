import ActionBarButton, { LABEL } from 'src/app/mobile/content/components/actionBarButton';

const clickButton = async label => {
    const button = ActionBarButton(label);
    await button.isElementEnabled();
    await button.clickElement();
};

async function save() {
    await clickButton(LABEL.SAVE);
}

const cancel = async () => {
    await clickButton(LABEL.CANCEL);
};
const EntryFormContainer = { save, cancel };
export default EntryFormContainer;
