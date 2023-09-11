import Main from 'src/app/mobile/content/core/pages/main';
import { PAGE_NAMES } from 'src/constants/navigation';
import MorePage, { ITEMS } from 'src/app/mobile/content/modules/More/pages/morePage';
import element from 'src/element';
import { addStep } from 'src/services/reporting/allure';
import SettingsPage from 'src/app/mobile/content/modules/Settings/pages/settingsPage';
import { setSnapshotMaxDepth } from 'src/services/driver/driverActions';
import { SNAPSHOT_DEPTH_MAX_VALUE_100, SNAPSHOT_DEPTH_MAX_VALUE_62 } from 'config/settings';

export const openMore = async () => {
    const maxRetryCount = 5;
    let counter;
    for (counter = 0; counter < maxRetryCount; counter++) {
        const isDisplayed = await element(ITEMS.LISTS).isElementDisplayed({
            timeout: 500,
        });
        if (!isDisplayed) {
            await Main.navigate(PAGE_NAMES.MORE);
        } else {
            break;
        }
    }
    await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_100);
    await MorePage.waitForOpened();
};

export async function navigateToSettings() {
    addStep('Open Settings page');
    await openMore();
    await MorePage.navigate(ITEMS.SETTINGS);
    await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_62);
    await SettingsPage.waitForOpened();
}
