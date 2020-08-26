import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        paddingHorizontal: 25,
        paddingBottom: 15,
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    base: {
        width: '100%',
        height: 80,
    },
});
