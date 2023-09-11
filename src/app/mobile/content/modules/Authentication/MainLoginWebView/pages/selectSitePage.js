import commonPage from 'src/app/mobile/content/components/commonPage';
import element from 'src/element';
import Context from 'src/services/driver/context';
import { sleep } from 'src/services/driver/driverActions';

const SELECTORS = {
    TITLE: {
        ios: '~Select site',
        android: '//android.widget.TextView[@text="Select site"]',
    },
};

async function selectSite(clientId) {
    await Context.switchToContextByParams(
        { title: 'DealCloud | Client Selection' },
        { strictEquality: false }
    );

    await element(`//div[text()='${clientId}']`).clickElement();
    await Context.switchToNativeApp();
    await sleep(3000);
}

const SelectSitePage = { ...commonPage(SELECTORS.TITLE, 'Select site'), selectSite };
export default SelectSitePage;
