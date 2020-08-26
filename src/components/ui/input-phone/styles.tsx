import { StyleSheet, Platform } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create({
    container: {
        position: 'relative',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: COLORS.COLOR_INPUT_BORDER,
        borderWidth: 0.8,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },

    col_country: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '8%',
        paddingVertical: Platform.OS === 'android' ? 10 : 12,
    },
    col_input: {
        width: '82%',
        paddingVertical: Platform.OS === 'android' ? 10 : 12,
    },
    col_clear: {
        width: '10%',
        alignItems: 'flex-end',
        paddingVertical: Platform.OS === 'android' ? 10 : 12,
    },

    is_bottom_space: {
        marginBottom: 10,
    },
    input: {
        paddingHorizontal: 0,
        fontSize: 14,
        paddingVertical: 0,
        width: '100%',
    },
    country_text: {
        color: '#000',
        textAlign: 'left',
    },
});
