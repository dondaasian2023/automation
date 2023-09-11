import element from 'src/element';
import { cookTestID, cookXPath } from 'src/services/cookTestID';
import swipeToElement, { DIRECTIONS } from 'src/services/driver/gestures/swipeToElement';
import { setSnapshotMaxDepth } from 'src/services/driver/driverActions';
import { SNAPSHOT_DEPTH_MAX_VALUE_100 } from 'config/settings';

const SELECTORS = {
    ROW: {
        ios: 'widget_details-grid-card_row_{rowName}',
        android:
            '//android.widget.TextView[@content-desc="widget_details-grid-card_row_{rowName}"]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView',
    },
};

async function getRowValue(rowName) {
    await setSnapshotMaxDepth(SNAPSHOT_DEPTH_MAX_VALUE_100);
    const testID = driver.isIOS
        ? cookTestID(SELECTORS.ROW.ios, { rowName })
        : cookXPath(SELECTORS.ROW.android, { rowName });
    const rowElement = element(testID);
    await swipeToElement(DIRECTIONS.UP, rowElement, { xPoint: 1 });
    return rowElement.getElementText();
}

const DetailsGridCard = { getRowValue };
export default DetailsGridCard;
