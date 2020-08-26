import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {},
    help: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    help_text: {
        fontSize: 13,
        color: COLORS.COLOR_TEXT,
    },
    button_text: {
        fontSize: 12,
        color: COLORS.COLOR_TEXT,
    },
    is_muted: {
        opacity: 0.2,
    },
    spinner: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 10,
        top: -2,
    },
});
