import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        paddingHorizontal: 10,
    },
    content: {
        paddingVertical: 15,
        borderBottomWidth: 0.8,
        borderColor: COLORS.COLOR_ITEM_BORDER,
    },
    is_last: {
        borderBottomWidth: 0,
    },
    msg: {
        fontSize: 14,
        color: COLORS.COLOR_TEXT,
    },
    col_date: {
        alignItems: 'flex-end',
    },
    date: {
        fontSize: 13,
        color: COLORS.COLOR_TEXT_MUTED,
    },
});
