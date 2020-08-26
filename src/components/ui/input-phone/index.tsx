import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import * as COLORS from '@components/ui/colors';
import { SvgCancelBold } from '@components/icons';

import styles from './styles';

type Props = {
    countryCode: string;
    value: string;
    onChangeText?: (value: string) => void;
    onClear?: () => void;
    isBottomSpace?: boolean;
    autoFocus?: boolean;
    placeholder?: string;
};

export const InputPhone = (props: Props) => {
    return (
        <View style={[styles.container, props.isBottomSpace && styles.is_bottom_space]}>
            <View style={styles.col_country}>
                <Text style={styles.country_text}>{props.countryCode}</Text>
            </View>
            <View style={styles.col_input}>
                <TextInput
                    keyboardType="phone-pad"
                    returnKeyType="done"
                    placeholder={props.placeholder}
                    autoFocus={props.autoFocus}
                    maxLength={10}
                    selectionColor={COLORS.COLOR_MAIN}
                    style={styles.input}
                    value={props.value}
                    onChangeText={props.onChangeText}
                />
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.col_clear} onPress={props.onClear}>
                <SvgCancelBold width={15} height={15} colorFill={COLORS.COLOR_INPUT_ICON} />
            </TouchableOpacity>
        </View>
    );
};
