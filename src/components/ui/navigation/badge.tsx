import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import styles from './styles';

type Props = {
    count: number;
    children: React.ReactChild | React.ReactChild[];
};

export const NavBadge = (props: Props) => {
    return (
        <View style={styles.badge_wrapper}>
            {props.count ? (
                <View style={styles.badge}>
                    <Text style={styles.badge_text}>{props.count}</Text>
                </View>
            ) : (
                <React.Fragment />
            )}
            {props.children}
        </View>
    );
};
