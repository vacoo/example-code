import React from 'react';
import { Text, TextStyle } from 'react-native';

import styles from './styles';

type Props = {
    children: string;
    style?: TextStyle;
};

export const HelpText = (props: Props) => {
    return <Text style={[styles.text, props.style]}>{props.children}</Text>;
};
