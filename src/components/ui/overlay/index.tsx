import React from 'react';
import { View, Animated, Easing } from 'react-native';

import styles from './styles';

import { SvgLoading } from '@components/icons';

type Props = {
    children: React.ReactChild | React.ReactChild[];
    isLoading: boolean;
};

export const Overlay = (props: Props) => {
    return (
        <View style={styles.container}>
            {props.isLoading ? (
                <View style={styles.overlay}>
                    <Loading />
                </View>
            ) : (
                <React.Fragment />
            )}
            {props.children}
        </View>
    );
};

function Loading() {
    const [indicator] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(indicator, {
                toValue: 1,
                duration: 1800,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
    }, []);

    const spin = indicator.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.loading}>
            <Animated.View
                style={{
                    transform: [
                        {
                            rotate: spin,
                        },
                    ],
                }}>
                <SvgLoading width={25} height={25} colorFill="#FFF" />
            </Animated.View>
        </View>
    );
}
