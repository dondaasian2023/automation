import OptionMenu from 'src/app/mobile/content/components/OptionsMenu/optionMenu';

// TODO: testID based on title for suggested search items needed
const clickSuggestedSearch = async (title) => {
    await OptionMenu.getTitle(title).clickElement();
};

const GridSearch = { clickSuggestedSearch };
export default GridSearch;
