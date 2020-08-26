import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        paddingVertical: 15,
        borderColor: COLORS.COLOR_INPUT_BORDER,
        borderBottomWidth: 1,
    },
    hide_bottom_border: {
        borderBottomWidth: 0,
    },
    col_arrow: {
        alignItems: 'flex-end',
    },
    text: {
        fontSize: 14,
        color: COLORS.COLOR_TEXT,
    },
    text_is_placeholder: {
        color: COLORS.COLOR_TEXT_PLACEHOLDER,
    },
});
