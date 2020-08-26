import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        alignItems: 'center',
        paddingVertical: 15,
    },
    link: {
        color: COLORS.COLOR_LINK,
    },
});
