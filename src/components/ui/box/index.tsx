import React from 'react';
import { View } from 'react-native';

import styles from './styles';

type Props = {
    children: React.ReactNode[] | React.ReactNode;
    isBorderBottom?: boolean;
    isBorderTop?: boolean;
    isTopSpace?: boolean;
    isBottomSpace?: boolean;
    isHorizontalSpace?: boolean;
};

export const Box = (props: Props) => (
    <View
        style={[
            styles.container,
            props.isBorderTop && styles.top,
            props.isBorderBottom && styles.bottom,
            props.isTopSpace && styles.is_top_space,
            props.isBottomSpace && styles.is_bottom_space,
            props.isHorizontalSpace && styles.is_horizontal_space
        ]}>
        {props.children}
    </View>
);
