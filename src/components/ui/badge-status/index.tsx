import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

type Props = {
    isActive: boolean;
};

export const BadgeStatus = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={[styles.badge, props.isActive ? styles.is_active : styles.is_inactive]} />
        </View>
    );
};
