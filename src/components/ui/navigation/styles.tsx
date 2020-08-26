import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Platform } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    button: {
        paddingHorizontal: 15,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_with_label: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: COLORS.COLOR_NAV_TITLE,
        marginRight: 5,
    },
    loading: {
        flexDirection: 'row',
    },

    title: {
        fontSize: 16,
        color: COLORS.COLOR_NAV_TITLE,
        fontWeight: '600',
        textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    },
    value: {
        fontSize: 13,
        marginRight: 5,
        color: COLORS.COLOR_TEXT_MUTED,
    },
    dropodown: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: Platform.OS === 'ios' ? 15 : 0,
        justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
    },

    nav_buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    badge_wrapper: {
        position: 'relative',
    },
    badge: {
        backgroundColor: COLORS.COLOR_SUCCESS,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 18,
        width: 18,
        position: 'absolute',
        right: -15,
        top: -3,
        zIndex: 10
    },
    badge_text: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFF',
    },
});
