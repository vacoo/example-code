import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        borderRadius: 50,
        position: 'relative',
    },
    dot: {
        width: 13,
        height: 13,
        backgroundColor: COLORS.COLOR_IMAGE_PLACEHOLDER,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#FFF',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    is_online: {
        backgroundColor: COLORS.COLOR_SUCCESS,
    },
});

export const imageStyle: ImageStyle = {
    borderRadius: 40,
    resizeMode: 'cover',
    backgroundColor: COLORS.COLOR_IMAGE_PLACEHOLDER,
};
