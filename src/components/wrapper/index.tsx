import React from 'react';
import { SafeAreaView, StyleProp, ViewStyle } from 'react-native';

import * as COLORS from '@components/ui/colors';

type Props = {
    children: React.ReactChild | React.ReactChild[];
    style?: StyleProp<ViewStyle>;
    isContrast?: boolean;
};

export const Wrapper = (props: Props) => (
    <SafeAreaView
        style={[{ flex: 1, backgroundColor: props.isContrast ? COLORS.COLOR_WRAPPER_CONTRAST : '#FFF' }, props.style]}>
        {props.children}
    </SafeAreaView>
);
