import { addStep } from 'src/services/reporting/allure';
import { expect } from 'chai';
import element from 'src/element';
import milliseconds from 'src/utils/milliseconds';

const SELECTOR = '~security_mdm_lock-message';

export default async function expectSecurityMDMLockMessageDisplayed() {
    addStep('Validate security MDM lock message');
    expect(
        await element(SELECTOR).isElementDisplayed({ timeout: milliseconds.seconds(90) }),
        'Security MDM lock message should be displayed'
    ).to.be.true;
}
