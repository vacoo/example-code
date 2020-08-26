import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import styles from './styles';

type Props = {
    children: JSX.Element | React.ReactNode;
    style?: StyleProp<ViewStyle>;
};

type GridColumnProps = {
    children: JSX.Element | React.ReactNode;
    size: number;
    left?: number;
    right?: number;
    style?: StyleProp<ViewStyle>;
};

export const GridRow = (props: Props) => <View style={[styles.row, props.style]}>{props.children}</View>;

export const GridColumn = (props: GridColumnProps) => (
    <View style={[{ width: props.size + '%', paddingLeft: props.left, paddingRight: props.right }, props.style]}>
        {props.children}
    </View>
);
