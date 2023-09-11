import { PAGE_NAMES } from 'src/constants/navigation';
import ScreenEmptyComponent from 'src/app/mobile/content/components/ScreenEmptyComponent/screenEmptyComponent';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';
import OptionMenu from 'src/app/mobile/content/components/OptionsMenu/optionMenu';
import FavoriteItem from 'src/app/mobile/content/modules/Favorites/pages/FavoritesList/components/favoriteItem';
import {
    EMPTY_SCREEN_LABEL,
    EMPTY_SCREEN_TITLE,
    WAIT_TO_BE_DISPLAYED_TIMEOUT_MS,
} from 'src/app/mobile/content/modules/Favorites/pages/FavoritesList/favoriteListConstants';

async function waitForOpened() {
    await NavBar.isPageOpened(PAGE_NAMES.MORE, PAGE_NAMES.FAVORITES);
}

function isOptionsMenuLabelDisplayed(listName) {
    return OptionMenu.getTitle(listName).isElementDisplayed();
}

async function clickOnFavoriteItem(itemName) {
    await FavoriteItem(itemName).clickElement();
}

async function isFavoriteItemDisplayed(itemName) {
    return FavoriteItem(itemName).isElementDisplayed({ timeout: WAIT_TO_BE_DISPLAYED_TIMEOUT_MS });
}

const FavoritesListPage = {
    NavBar,
    waitForOpened,
    clickOnFavoriteItem,
    isFavoriteItemDisplayed,
    isOptionsMenuLabelDisplayed,
    NoFavoritesEmptyScreen: ScreenEmptyComponent(EMPTY_SCREEN_TITLE, EMPTY_SCREEN_LABEL),
};
export default FavoritesListPage;
