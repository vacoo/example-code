import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        paddingHorizontal: 10,
    },
    col_label: {
        justifyContent: 'flex-start',
        paddingTop: 15,
    },
    label: {
        fontSize: 13,
        color: COLORS.COLOR_TEXT,
    },
    label_head: {
        fontSize: 12,
        color: COLORS.COLOR_TEXT_MUTED,
        marginBottom: 5
    },
});
