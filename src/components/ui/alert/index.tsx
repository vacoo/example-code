import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import styles from './styles';
import { SvgWarning, SvgError } from '@components/icons';

const bgWarning = require('@assets/bg-warning.png');
const bgError = require('@assets/bg-error.png');

type Props = {
    title: string;
    desc: string;
    onPress: () => void;
};

export const AlertWarning = (props: Props) => {
    return (
        <ImageBackground source={bgWarning} style={styles.image}>
            <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={props.onPress}>
                <SvgWarning width={20} height={20} />
                <View style={styles.content}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.desc}>{props.desc}</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    );
};

export const AlertError = (props: Props) => {
    return (
        <ImageBackground source={bgError} style={styles.image}>
            <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={props.onPress}>
                <SvgError width={20} height={20} />
                <View style={styles.content}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.desc}>{props.desc}</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    );
};
