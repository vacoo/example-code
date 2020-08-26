import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import { GridRow, GridColumn } from '@components/ui/grid';
import { SvgNext } from '@components/icons';
import * as COLORS from '@components/ui/colors';

import { sliceStr } from '@resources/utils';

type Props = {
    children?: string;
    placeholder?: string;
    hideArrow?: boolean;
    hideBottomBorder?: boolean;
    onPress: () => void;
    sliceLimit?: number;
};

export const InputItem = (props: Props) => {
    let sliceLimit = props.sliceLimit ? props.sliceLimit : 25;
    return (
        <TouchableOpacity
            style={[styles.container, props.hideBottomBorder && styles.hide_bottom_border]}
            activeOpacity={0.8}
            onPress={props.onPress}>
            <GridRow>
                <GridColumn size={80}>
                    <Text style={[styles.text, !props.children && styles.text_is_placeholder]}>
                        {props.children ? sliceStr(props.children, sliceLimit) : props.placeholder}
                    </Text>
                </GridColumn>
                <GridColumn size={20} style={styles.col_arrow}>
                    {!props.hideArrow ? (
                        <SvgNext width={15} height={15} colorFill={COLORS.COLOR_ITEM_ARROW} />
                    ) : (
                        <React.Fragment />
                    )}
                </GridColumn>
            </GridRow>
        </TouchableOpacity>
    );
};
