import React from 'react';
import { View, Image } from 'react-native';

import ImageDefault from '@assets/default.png';

import styles, { imageStyle } from './styles';

type Props = {
    uri: string;
    size: number;
    isOnline?: boolean;
};

export const Avatar = (props: Props) => {
    return (
        <View style={[styles.container, { width: props.size, height: props.size }]}>
            {props.uri ? (
                <Image
                    source={{ uri: props.uri }}
                    style={[
                        {
                            width: props.size,
                            height: props.size,
                        },
                        imageStyle,
                    ]}
                />
            ) : (
                <Image source={ImageDefault} style={[{ width: props.size, height: props.size }, imageStyle]} />
            )}
            {props.isOnline !== undefined ? (
                <View style={[styles.dot, props.isOnline && styles.is_online]} />
            ) : (
                <React.Fragment />
            )}
        </View>
    );
};
