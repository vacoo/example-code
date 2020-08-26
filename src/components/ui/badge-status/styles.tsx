import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        paddingHorizontal: 10,
    },
    badge: {
        width: 10,
        height: 10,
        backgroundColor: '#000',
        borderRadius: 25,
        
    },
    is_active: {
        backgroundColor: COLORS.COLOR_SUCCESS,
    },
    is_inactive: {
        backgroundColor: COLORS.COLOR_ERROR,
    },
});
