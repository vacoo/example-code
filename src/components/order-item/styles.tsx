import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        backgroundColor: '#FFF',
        marginBottom: 5,
    },
    content: {
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    content_head: {
        marginBottom: 5,
    },
    address_1: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    address_2: {
        fontSize: 13,
        color: COLORS.COLOR_TEXT,
    },
    meta: {
        fontSize: 13,
        color: COLORS.COLOR_TEXT_MUTED,
        marginBottom: 5,
    },

    status: {
        borderRadius: 3,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginBottom: 2,
        alignSelf: 'flex-start',
    },
    status_text: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    extra: {
        fontSize: 13,
        color: COLORS.COLOR_TEXT_MUTED,
        maxHeight: 38,
    },
    is_full: {
        maxHeight: 'auto',
    },

    progress: {
        width: '100%',
    },
    progress_content: {
        position: 'relative',
        zIndex: 110,
    },
    progress_active: {
        width: '0%',
        height: '100%',
        position: 'absolute',
        zIndex: 100,
        opacity: 0.1,
        backgroundColor: COLORS.COLOR_ERROR,
    },
    progress_active_low: {
        backgroundColor: COLORS.COLOR_ERROR,
    },
    progress_active_middle: {
        backgroundColor: COLORS.COLOR_DANGER,
    },
    progress_active_many: {
        backgroundColor: COLORS.COLOR_SUCCESS,
    },
});
