import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    text: {
        fontSize: 13,
        color: COLORS.COLOR_TEXT_PLACEHOLDER,
    },
});
