import { StyleSheet, Platform } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create({
    container: {
        position: 'relative',
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.COLOR_INPUT_BORDER,
        borderWidth: 0.8,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },
    hide_bottom_border: {
        borderBottomWidth: 0,
    },
    is_bottom_space: {
        marginBottom: 10,
    },
    placeholder: {
        position: 'absolute',
        left: 0,
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: COLORS.COLOR_TEXT_PLACEHOLDER,
    },

    icon: {
        marginRight: 10,
        width: 15,
    },
    input: {
        paddingHorizontal: 0,
        fontSize: 16,
        paddingVertical: Platform.OS === 'android' ? 10 : 12,
        width: '100%',
        color: '#000',
    },
    input_is_half: {
        width: '70%',
        paddingRight: 5,
    },
    is_rounded: {
        borderRadius: 25,
    },
    is_disabled: {
        color: COLORS.COLOR_TEXT_MUTED,
        opacity: 0.5
    },
    input_is_multiline: {
        paddingTop: 8,
        maxHeight: 150,
        height: 'auto',
        textAlignVertical: 'top',
    },
    input_is_textarea: {
        minHeight: 100,
        maxHeight: 200,
    },
    right_component: {
        alignItems: 'flex-end',
        paddingVertical: 5,
        width: '30%',
    },

    overlay: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
});
