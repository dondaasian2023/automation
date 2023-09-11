import BottomActionButton from 'src/app/mobile/content/components/bottomActionButton';
import { Platform } from 'src/services/platform';

export const KeyboardSingleDoneButtonAccessory = Platform.select({
    ios: BottomActionButton,
    android: null,
});
