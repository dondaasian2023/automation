import { logger } from 'src/utils/logger';
import TOUCH_ACTIONS from 'src/services/driver/touchActions';
import { getWindowSize } from 'src/services/driver/driverActions';
import isUndefined from 'src/utils/types/isUndefined';

const { PRESS, WAIT, RELEASE, MOVE_TO } = TOUCH_ACTIONS;
const WAIT_TIME_OUT_MS = 500;

export const DIRECTIONS = {
    UP: 'up',
    DOWN: 'down',
};

async function swipeUpOrDown(upDown, xPoint, yPointDown, yPointUp) {
    const { width, height } = await getWindowSize();

    xPoint = isUndefined(xPoint) ? width / 2 : xPoint;
    yPointDown = isUndefined(yPointDown) ? height * 0.7 : yPointDown;
    yPointUp = isUndefined(yPointUp) ? height / 2 : yPointUp;

    let start;
    let end;
    if (upDown === DIRECTIONS.DOWN) {
        start = yPointUp;
        end = yPointDown;
    } else {
        start = yPointDown;
        end = yPointUp;
    }

    logger.debug(`Swiping ${upDown} from ${start} to ${end} by X: ${xPoint}`);

    await browser.touchAction([
        { action: PRESS, x: xPoint, y: start },
        { action: WAIT, ms: WAIT_TIME_OUT_MS },
        { action: MOVE_TO, x: xPoint, y: end },
        { action: RELEASE },
    ]);
}

async function swipeToElement(direction, element, { xPoint } = {}, maxSwipesCount = 15) {
    let counter;
    for (counter = 0; counter < maxSwipesCount; counter++) {
        const isDisplayed = await element.isElementDisplayed({ timeout: WAIT_TIME_OUT_MS });
        if (!isDisplayed) {
            switch (direction) {
                case DIRECTIONS.UP:
                    await swipeUp(xPoint);
                    break;

                case DIRECTIONS.DOWN:
                    await swipeDown(xPoint);
                    break;
                default:
                    logger.error(`Unsupported direction: ${direction}`);
            }
        } else {
            break;
        }
    }
    if (counter === maxSwipesCount) {
        logger.error('Too many swipes, please check your test logic');
    }
}

export async function swipeUp(xPoint = 1) {
    await swipeUpOrDown(DIRECTIONS.UP, xPoint);
}

async function swipeDown(xPoint) {
    await swipeUpOrDown(DIRECTIONS.DOWN, xPoint);
}

export default swipeToElement;
