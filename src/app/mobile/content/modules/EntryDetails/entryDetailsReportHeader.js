import element from 'src/element';

const SELECTORS = {
    STAR: '~entry-details-reports_action-control-rating-star',
    STAR_SOLID: '~entry-details-reports_action-control-rating-star_solid',
};

async function addToFavorites() {
    await element(SELECTORS.STAR).clickElement();
}

async function removeFromFavorites() {
    await element(SELECTORS.STAR_SOLID).clickElement();
}

const EntryDetailsReportHeader = { addToFavorites, removeFromFavorites };
export default EntryDetailsReportHeader;
