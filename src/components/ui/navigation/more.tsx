import React from 'react';
import { TouchableOpacity } from 'react-native';

import { SvgMore } from '@components/icons';
import * as COLORS from '@components/ui/colors';

import styles from './styles';

type Props = {
    onPress: () => void;
};

export const NavMore = (props: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress} activeOpacity={0.5}>
            <SvgMore width={15} height={15} colorFill={COLORS.COLOR_NAV_ICON} />
        </TouchableOpacity>
    );
};
