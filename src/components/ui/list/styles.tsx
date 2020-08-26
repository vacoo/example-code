import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
       
    },
    item_container: {
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },
    is_last: {
        borderBottomWidth: 0,
    },
    item: {
        borderBottomWidth: 0.8,
        borderColor: COLORS.COLOR_ITEM_BORDER,
        paddingVertical: 15,
    },
    col_label: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    col_component: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    icon: {
        paddingLeft: 5,
    },
    icon_left: {
        paddingRight: 8,
    },
    text: {
        fontSize: 14,
        color: COLORS.COLOR_TEXT_MUTED,
        textAlign: 'right',
    },
    label: {
        fontSize: 14,
        color: COLORS.COLOR_TEXT,
    },
    desc: {
        fontSize: 13,
        color: COLORS.COLOR_TEXT_MUTED,
    },
    help: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    help_text: {
        fontSize: 14,
        color: COLORS.COLOR_TEXT_MUTED,
    },
});
