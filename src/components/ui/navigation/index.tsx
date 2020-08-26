import React from 'react';
import { StyleProp, ViewStyle, View, Text, TouchableOpacity } from 'react-native';

import * as COLORS from '@components/ui/colors';
import { BottomTabBarOptions } from '@react-navigation/bottom-tabs';

import { COLOR_TAB_ACTIVE, COLOR_TAB_INACTIVE } from '@components/ui/colors';
import styles from './styles';
import { SvgArrowDown } from '@components/icons';

export const stackNavigatorHeaderStyle: StyleProp<ViewStyle> = {
    backgroundColor: COLORS.COLOR_NAV_TOP,
    shadowOffset: { width: 0, height: 0 },
};

export const stackNavigatorHeaderTitleStyle: any = {
    color: COLORS.COLOR_NAV_TITLE,
    fontSize: 16,
};

export const bottomTabBarOptions: BottomTabBarOptions = {
    showLabel: true,
    labelStyle: {
        fontSize: 13,
    },
    activeTintColor: COLOR_TAB_ACTIVE,
    inactiveTintColor: COLOR_TAB_INACTIVE,
};

export { NavBack } from './back';
export { NavLabel } from './label';
export { NavMore } from './more';
export { NavBadge } from './badge';

type TitleDropdownProps = {
    title?: string;
    value: string;
    onPress: () => void;
};

export const TitleDropdown = (props: TitleDropdownProps) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.dropodown}>
                <Text style={styles.value}>{props.value}</Text>
                <View>
                    <SvgArrowDown width={12} height={12} colorFill={COLORS.COLOR_ITEM_ARROW} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

type NavButtonsProps = {
    children: React.ReactChild | React.ReactChild[];
};

export const NavButtons = (props: NavButtonsProps) => {
    return <View style={styles.nav_buttons}>{props.children}</View>;
};
