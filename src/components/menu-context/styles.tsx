import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1000,
        justifyContent: 'flex-end',
    },
    overflow: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        zIndex: 1000,
    },
    content: {
        paddingHorizontal: 10,
        zIndex: 1500,
    },
    content_item: {
        backgroundColor: '#FFF',
        bottom: 0,
        borderRadius: 10,
        marginBottom: 10,
    },
    area_close: {
        height: '100%',
        width: '100%',
        zIndex: 1500,
        top: 0,
        position: "absolute"
    },
    item: {
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: COLORS.COLOR_ITEM_BORDER,
    },
    item_text: {
        fontSize: 14,
        color: COLORS.COLOR_TEXT,
    },
});
