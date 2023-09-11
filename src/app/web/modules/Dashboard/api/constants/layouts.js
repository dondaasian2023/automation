import { generateUuid } from 'src/utils/generateUuid';

/**
 * @deprecated will be deleted
 */
export function cookItemsArray(widgetIds) {
    let x = 1;
    return widgetIds.map(id => ({ id, order: x++ }));
}

/**
 * @deprecated use `configureLayout`
 */
export function layout({ widgetIds }) {
    return {
        items: cookItemsArray(widgetIds),
    };
}

export const configureLayout = widgetId => ({
    layoutId: generateUuid(),
    id: widgetId,
});
