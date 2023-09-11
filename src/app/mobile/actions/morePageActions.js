import { openMore } from 'src/app/mobile/actions/mainActions';
import MorePage from 'src/app/mobile/content/modules/More/pages/morePage';

export const openItem = async itemName => {
    await openMore();
    await MorePage.navigate(itemName);
};
