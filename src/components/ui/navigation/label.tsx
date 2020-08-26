import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

type Props = {
    label: string;
    color?: string;
    onPress: () => void;
};

export const NavLabel = (props: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress} activeOpacity={0.5}>
            <Text style={[styles.label, props.color ? { color: props.color } : {}]}>{props.label}</Text>
        </TouchableOpacity>
    );
};
