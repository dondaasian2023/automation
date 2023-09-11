import element from 'src/element';
import { cookTestID } from 'src/services/cookTestID';
import { setSnapshotMaxDepth } from 'src/services/driver/driverActions';
import { SNAPSHOT_DEPTH_MAX_VALUE_100 } from 'config/settings';

const SELECTORS = {
    EMPTY_SCREEN_TITLE_LABEL: 'components_screen-empty-component_title_{title}',
    EMPTY_SCREEN_TEXT_LABEL: 'components_screen-empty-component_text_{text}',
};

async function isTitleDisplayed(title, snapshotValue = SNAPSHOT_DEPTH_MAX_VALUE_100) {
    await setSnapshotMaxDepth(snapshotValue);
    return await element(
        cookTestID(SELECTORS.EMPTY_SCREEN_TITLE_LABEL, { title })
    ).isElementDisplayed();
}

async function isTextDisplayed(text, snapshotValue = SNAPSHOT_DEPTH_MAX_VALUE_100) {
    await setSnapshotMaxDepth(snapshotValue);
    return await element(
        cookTestID(SELECTORS.EMPTY_SCREEN_TEXT_LABEL, { text })
    ).isElementDisplayed();
}

export default function ScreenEmptyComponent(title, text, snapshotValue) {
    return {
        title,
        text,
        isTitleDisplayed: () => isTitleDisplayed(title, snapshotValue),
        isTextDisplayed: () => isTextDisplayed(text, snapshotValue),
    };
}
