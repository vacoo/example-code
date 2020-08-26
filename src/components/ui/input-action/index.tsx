import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './styles';

import * as COLORS from '@components/ui/colors';

type InputActionHelpProps = {
    children: JSX.Element;
};

export const InputActionHelp = (props: InputActionHelpProps) => {
    return (
        <View style={styles.help}>
            <Text style={styles.help_text}>{props.children}</Text>
        </View>
    );
};

type InputActionButtonProps = {
    children: string;
    onPress: () => void;
    isLoading: boolean;
    isDisabled: boolean;
};

export const InputActionButton = (props: InputActionButtonProps) => {
    const isLock = props.isLoading || props.isDisabled;
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                if (!isLock) {
                    props.onPress();
                }
            }}
            activeOpacity={0.6}>
            <Text style={[styles.button_text, isLock ? styles.is_muted : false]}>{props.children}</Text>
            {props.isLoading && <ActivityIndicator style={styles.spinner} size="small" color={COLORS.COLOR_MAIN} />}
        </TouchableOpacity>
    );
};
