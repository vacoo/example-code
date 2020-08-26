import React from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    ViewStyle,
    ActivityIndicator,
    Platform,
    TouchableOpacity,
} from 'react-native';

import styles from './styles';

import * as COLORS from '@components/ui/colors';

export enum BUTTON_TYPE {
    MAIN_FILL = 'fill',
    MAIN_GHOST = 'ghost',
    SUCCESS_FILL = 'success_fill',
    SUCCESS_BORDER = 'success_border',
    SUCCESS_GHOST = 'success_ghost',
    SECOND_BORDER = 'border',
    ERROR_GHOST = 'error_ghost',
    ERROR_BORDER = 'error_border',
    LINK_GHOST = 'link_ghost',
    IN_WAY_BORDER = "in_way_border"
}

export type Props = {
    children?: string;
    icon?: JSX.Element;
    type?: BUTTON_TYPE;

    onPress: () => void;

    isLoading?: boolean;
    isDisabled?: boolean;
    isSmall?: boolean;

    style?: ViewStyle;
};

export const Button = (props: Props) => {
    const onPress = () => {
        if (!props.isLoading && !props.isDisabled) {
            props.onPress();
        }
    };

    return (
        <ButtonWrapper onPress={onPress}>
            <View
                style={[
                    styles.button,
                    props.isDisabled && styles.button_is_disabled,
                    props.isSmall && styles.button_is_small,
                    props.type === BUTTON_TYPE.MAIN_FILL && styles.button_main_fill,
                    props.type === BUTTON_TYPE.MAIN_GHOST && styles.button_main_ghost,
                    props.type === BUTTON_TYPE.SECOND_BORDER && styles.button_second_border,
                    props.type === BUTTON_TYPE.ERROR_GHOST && styles.button_error_ghost,
                    props.type === BUTTON_TYPE.ERROR_BORDER && styles.button_error_border,
                    props.type === BUTTON_TYPE.LINK_GHOST && styles.button_link_ghost,
                    props.type === BUTTON_TYPE.SUCCESS_FILL && styles.button_success_fill,
                    props.type === BUTTON_TYPE.SUCCESS_BORDER && styles.button_success_border,
                    props.type === BUTTON_TYPE.IN_WAY_BORDER && styles.button_in_way_border,
                    props.type === BUTTON_TYPE.SUCCESS_GHOST && styles.button_success_ghost,
                    props.style,
                ]}>
                {props.isLoading && (
                    <ActivityIndicator style={styles.spinner} size="small" color={getSpinnerColor(props.type)} />
                )}
                {props.icon && <View style={[styles.icon, props.isLoading && styles.text_loading]}>{props.icon}</View>}
                <Text
                    style={[
                        styles.text,
                        props.isSmall && styles.text_is_small,
                        props.type === BUTTON_TYPE.MAIN_FILL && styles.text_main_fill,
                        props.type === BUTTON_TYPE.MAIN_GHOST && styles.text_main_ghost,
                        props.type === BUTTON_TYPE.SECOND_BORDER && styles.text_second_border,
                        props.type === BUTTON_TYPE.ERROR_GHOST && styles.text_error_ghost,
                        props.type === BUTTON_TYPE.ERROR_BORDER && styles.text_error_border,
                        props.type === BUTTON_TYPE.LINK_GHOST && styles.text_link_ghost,
                        props.type === BUTTON_TYPE.SUCCESS_FILL && styles.text_success_fill,
                        props.type === BUTTON_TYPE.SUCCESS_BORDER && styles.text_success_border,
                        props.type === BUTTON_TYPE.IN_WAY_BORDER && styles.text_in_way_border,
                        props.type === BUTTON_TYPE.SUCCESS_GHOST && styles.text_success_ghost,
                        props.isLoading && styles.text_loading,
                    ]}>
                    {props.children}
                </Text>
            </View>
        </ButtonWrapper>
    );
};

function getSpinnerColor(type?: BUTTON_TYPE): string {
    switch (type) {
        case BUTTON_TYPE.MAIN_GHOST:
        case BUTTON_TYPE.IN_WAY_BORDER:
        case BUTTON_TYPE.SUCCESS_BORDER:
            return COLORS.COLOR_MAIN;
        case BUTTON_TYPE.MAIN_FILL:
            return '#FFF';
        case BUTTON_TYPE.SECOND_BORDER:
            return COLORS.COLOR_TEXT;
        default:
            return '#FFF';
    }
}

type WrapperProps = {
    onPress: () => void;
    children: React.ReactChild | React.ReactChild[];
};

export const ButtonWrapper = (props: WrapperProps) => {
    return Platform.OS === 'android' ? (
        <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={props.onPress}>
            {props.children}
        </TouchableNativeFeedback>
    ) : (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
            {props.children}
        </TouchableOpacity>
    );
};
