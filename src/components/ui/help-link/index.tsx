import React from 'react';
import { View, Linking, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

type Props = {
    link: string;
    value: string;
};

export const HelpLink = (props: Props) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.6}
            onPress={() => {
                Linking.openURL(props.link);
            }}>
            <Text style={styles.link}>{props.value}</Text>
        </TouchableOpacity>
    );
};
