import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        paddingVertical: 80,
        paddingHorizontal: 15,
    },
    text: {
        color: COLORS.COLOR_TEXT_PLACEHOLDER,
        fontSize: 14,
        textAlign: 'center',
    },
});
