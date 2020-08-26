import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

const styles: { [key: string]: ViewStyle | TextStyle | ImageStyle } = {
    container: {
        // borderColor: COLORS.COLOR_FIELD_GHOST_BORDER,
    },
    is_top_space: {
        paddingTop: 10,
    },
    is_bottom_space: {
        paddingBottom: 10,
    },
    top: {
        borderTopWidth: 1,
    },
    bottom: {
        borderBottomWidth: 1,
    },
    is_horizontal_space: {
        paddingHorizontal: 10,
    },
};

export default StyleSheet.create(styles);
