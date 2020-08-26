import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
    },
    content: {
        borderBottomWidth: 0.8,
        borderColor: COLORS.COLOR_ITEM_BORDER,
        paddingVertical: 10,
    },
    is_last: {
        borderBottomWidth: 0,
    },
    sum_text: {
        fontSize: 16,
        color: COLORS.COLOR_TEXT,
        fontWeight: 'bold',
    },
    is_plus: {
        color: COLORS.COLOR_SUCCESS,
    },
    created_at: {
        fontSize: 13,
        color: COLORS.COLOR_TEXT_MUTED,
    },
    col_date: {
        alignItems: 'flex-end',
    },
});
