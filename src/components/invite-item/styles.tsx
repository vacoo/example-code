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
        paddingVertical: 15,
    },
    is_last: {
        borderBottomWidth: 0,
    },
    created_at: {
        fontSize: 13,
        color: COLORS.COLOR_TEXT_MUTED,
    },
    label: {
        fontSize: 14,
        color: COLORS.COLOR_TEXT,
    },
    current_text: {
        color: COLORS.COLOR_SUCCESS,
    },
    col_date: {
        alignItems: 'flex-end',
    },
    name_text: {
        color: COLORS.COLOR_TEXT,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
