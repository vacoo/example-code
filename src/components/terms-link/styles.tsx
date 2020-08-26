import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    text: {
        color: COLORS.COLOR_TEXT_MUTED,
        fontSize: 12,
    },
    is_mark: {
        color: COLORS.COLOR_LINK,
    },
});
