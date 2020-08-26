import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

export default StyleSheet.create<{ [key: string]: ViewStyle | TextStyle | ImageStyle }>({
    container: {
        height: '100%',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
