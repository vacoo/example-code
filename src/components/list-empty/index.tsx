import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

type Props = {
    children: string;
};

export const ListEmpty = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    );
};
