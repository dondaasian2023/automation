import DetailsGridCard from 'src/app/mobile/content/modules/Widget/DetailsGridCard/detailsGridCard';
import NavBar from 'src/app/mobile/content/components/NavBar/navBar';

async function waitForOpened(listName, entryName) {
    if (!listName) {
        await NavBar.waitForContextOpened(entryName);
    }
    if (!entryName) {
        await NavBar.waitForPrevContextOpened(listName);
    } else {
        await NavBar.waitForPageOpened(listName, entryName);
    }
}

const DetailGridWidget = { DetailsGridCard, waitForOpened };
export default DetailGridWidget;
