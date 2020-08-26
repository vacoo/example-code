import React from 'react';
import {
    View,
    TextInput,
    KeyboardTypeOptions,
    TouchableOpacity,
    ReturnKeyTypeOptions,
    Platform,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';

import * as COLORS from '@components/ui/colors';

import styles from './styles';

type Props = {
    value?: string;
    placeholder?: string;
    icon?: JSX.Element;
    onChangeText?: (value: string) => void;
    isBottomSpace?: boolean;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
    autoFocus?: boolean;
    multiline?: boolean;
    rightComponent?: React.ReactChild;
    onPress?: () => void;
    returnKeyType?: ReturnKeyTypeOptions;
    onEndEditing?: () => void;
    isRounded?: boolean;
    isTextarea?: boolean;
    onFocus?: () => void;
    isDisabled?: boolean;
    hideBottomBorder?: boolean;
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle|TextStyle>;
};

export const Input = (props: Props) => {
    const [multiline, setMultiline] = React.useState<boolean>(props.multiline ? props.multiline : false);

    // Хак для активации вставки текста в поле для ввода
    React.useEffect(() => {
        if (props.multiline && Platform.OS === 'android') {
            setMultiline(false);
            setTimeout(() => {
                setMultiline(true);
            }, 50);
        }
    }, []);

    return (
        <View
            style={[
                styles.container,
                props.isBottomSpace && styles.is_bottom_space,
                props.isRounded ? styles.is_rounded : false,
                props.hideBottomBorder && styles.hide_bottom_border,
                props.isDisabled ? styles.is_disabled : false,
                props.style,
            ]}>
            {props.onPress && (
                <TouchableOpacity
                    style={[styles.overlay, props.rightComponent ? styles.input_is_half : false]}
                    onPress={props.onPress}
                    activeOpacity={1}
                />
            )}
            {props.icon && <View style={styles.icon}>{props.icon}</View>}
            <TextInput
                keyboardType={props.keyboardType}
                maxLength={props.maxLength}
                multiline={multiline}
                editable={props.onPress || props.isDisabled ? false : true}
                selectionColor={COLORS.COLOR_MAIN}
                placeholder={props.placeholder}
                style={[
                    styles.input,
                    props.rightComponent ? styles.input_is_half : false,
                    props.multiline ? styles.input_is_multiline : false,
                    props.isTextarea ? styles.input_is_textarea : false,
                   
                    props.inputStyle,
                ]}
                value={props.value}
                autoFocus={props.autoFocus}
                placeholderTextColor={COLORS.COLOR_TEXT_PLACEHOLDER}
                onChangeText={props.onChangeText}
                onEndEditing={props.onEndEditing}
                returnKeyType={props.returnKeyType}
                onFocus={props.onFocus}
            />
            {props.rightComponent && <View style={styles.right_component}>{props.rightComponent}</View>}
        </View>
    );
};
