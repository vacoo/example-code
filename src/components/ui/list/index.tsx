import React from 'react';
import { View, Text, TouchableOpacity, TextStyle } from 'react-native';

import styles from './styles';
import { GridRow, GridColumn } from '@components/ui/grid';
import { SvgArrowRight } from '@components/icons';
import * as COLORS from '@components/ui/colors';

type Props = {
    children: JSX.Element | JSX.Element[];
};

export const List = (props: Props) => {
    return <View style={styles.container}>{props.children}</View>;
};

type ItemProps = {
    label: string;
    desc?: string;
    children?: React.ReactChild | React.ReactChild[];
    onPress?: () => void;
    isLast?: boolean;
    isArrowNext?: boolean;
    labelStyle?: TextStyle;
    icon?: React.ReactChild | React.ReactChild[];
};

export const ListItem = (props: ItemProps) => {
    return (
        <TouchableOpacity activeOpacity={props.onPress ? 0.6 : 1} onPress={props.onPress} style={styles.item_container}>
            <GridRow style={[styles.item, props.isLast && styles.is_last]}>
                <GridColumn size={props.children ? 60 : 90} style={styles.col_label}>
                    <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
                    {props.desc ? <Text style={styles.desc}>{props.desc}</Text> : <React.Fragment />}
                </GridColumn>
                <GridColumn size={props.children ? 40 : 10} style={styles.col_component}>
                    {props.children}
                    {props.isArrowNext ? (
                        <View style={styles.icon}>
                            <SvgArrowRight width={15} height={15} colorFill={COLORS.COLOR_ITEM_ICON} />
                        </View>
                    ) : (
                        <React.Fragment />
                    )}
                    {props.icon ? <View style={styles.icon}>{props.icon}</View> : <React.Fragment />}
                </GridColumn>
            </GridRow>
        </TouchableOpacity>
    );
};

type ListItemTextProps = {
    children?: string;
    style?: TextStyle;
};

export const ListItemText = (props: ListItemTextProps) => {
    return <Text style={[styles.text, props.style]}>{props.children}</Text>;
};

type ListHelpProps = {
    children?: string;
};

export const ListHelp = (props: ListHelpProps) => (
    <View style={styles.help}>
        <Text style={styles.help_text}>{props.children}</Text>
    </View>
);
