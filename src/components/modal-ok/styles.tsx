import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overflow: {
        backgroundColor: '#000',
        opacity: 0.4,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    content: {
        backgroundColor: '#FFF',
        zIndex: 110,
        paddingHorizontal: 15,
        paddingTop: 25,
    },
    body: {
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    site: {
        fontWeight: 'bold',
        marginBottom: 15,
    },
    desc: {
        color: COLORS.COLOR_TEXT_MUTED,
        fontSize: 13,
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        paddingVertical: 15,
        borderTopWidth: 0.5,
        borderColor: COLORS.COLOR_ITEM_BORDER,
    },
    button_text: {
        fontSize: 14,
        textAlign: 'center',
    },
});
