import { Platform, Linking } from 'react-native';

export const PStoreAppStore = 'https://apps.apple.com/ru/app/vodopad-drive/id1447593924';
export const PStoreGooglePlay =
    'https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=team.creatif.vodopad_drive';

export function toPStore() {
    if (Platform.OS === 'ios') {
        Linking.openURL(PStoreAppStore);
    } else {
        Linking.openURL(PStoreGooglePlay);
    }
}
