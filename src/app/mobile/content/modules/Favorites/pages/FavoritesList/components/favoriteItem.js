import { cookTestID } from 'src/services/cookTestID';
import element from 'src/element';

const SELECTOR = 'favorites_favorites-list_list-item_{name}';

export default function FavoriteItem(name) {
    const testID = cookTestID(SELECTOR, { name });
    return element(testID);
}
