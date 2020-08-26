import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 4,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button_is_disabled: {
        opacity: 0.3,
    },

    // SMALL
    button_is_small: {
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    text_is_small: {
        fontSize: 13,
    },

    spinner: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 10,
    },
    icon: {
        marginRight: 10,
        position: 'relative',
        zIndex: 1,
    },

    text: {
        color: COLORS.COLOR_TEXT,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    text_loading: {
        opacity: 0.3,
    },

    button_main_fill: {
        backgroundColor: COLORS.COLOR_MAIN,
        borderColor: COLORS.COLOR_BUTTON_BORDER_MAIN,
        borderWidth: 0.5,
    },
    text_main_fill: {
        color: '#FFF',
    },

    button_main_ghost: {
        backgroundColor: '#FFF',
    },
    text_main_ghost: {
        color: COLORS.COLOR_MAIN,
    },

    button_link_ghost: {
        backgroundColor: 'transparent',
    },
    text_link_ghost: {
        color: COLORS.COLOR_LINK,
        fontWeight: 'normal',
    },

    button_second_border: {
        borderWidth: 1,
        borderColor: COLORS.COLOR_BUTTON_BORDER_SECOND,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    text_second_border: {
        color: COLORS.COLOR_TEXT,
    },

    button_error_border: {
        borderWidth: 1,
        borderColor: COLORS.COLOR_ERROR,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    text_error_border: {
        color: COLORS.COLOR_ERROR,
    },

    button_error_ghost: {},
    text_error_ghost: {
        color: COLORS.COLOR_ERROR,
    },

    button_success_fill: {
        backgroundColor: COLORS.COLOR_SUCCESS,
    },
    text_success_fill: {
        color: '#FFF',
    },

    button_success_border: {
        borderWidth: 0.8,
        borderColor: COLORS.COLOR_SUCCESS,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    text_success_border: {
        color: COLORS.COLOR_SUCCESS,
    },

    button_in_way_border: {
        borderWidth: 0.8,
        borderColor: COLORS.COLOR_IN_WAY,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    text_in_way_border: {
        color: COLORS.COLOR_IN_WAY,
    },

    button_success_ghost: {
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    text_success_ghost: {
        color: COLORS.COLOR_SUCCESS,
    },
});
