import element from 'src/element';
import ScreenEmptyComponent from 'src/app/mobile/content/components/ScreenEmptyComponent/screenEmptyComponent';
import {
    FAVORITES_EMPTY_SCREEN_LABEL,
    FAVORITES_EMPTY_SCREEN_TITLE,
} from 'src/app/mobile/content/modules/Search/QuickSearch/quickSearchConstants';

const ELEMENTS = {
    YOU_HAVE_NO_RECENT_SEARCHES_LABEL: {
        SELECTOR: '~search_quick-search_quick-search-stub_recent-searches_no-searches',
        WAIT_TIME_OUT_MS: 2000,
    },
};

export default async function youHaveNoRecentSearchesIsDisplayed() {
    const { SELECTOR, WAIT_TIME_OUT_MS } = ELEMENTS.YOU_HAVE_NO_RECENT_SEARCHES_LABEL;
    return element(SELECTOR).isElementDisplayed({ timeout: WAIT_TIME_OUT_MS });
}

const FavoritesEmptyScreen = ScreenEmptyComponent(
    FAVORITES_EMPTY_SCREEN_TITLE,
    FAVORITES_EMPTY_SCREEN_LABEL
);

export { FavoritesEmptyScreen };
