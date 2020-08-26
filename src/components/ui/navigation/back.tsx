import React from 'react';
import { TouchableOpacity } from 'react-native';

import { SvgArrowBack } from '@components/icons';
import * as COLORS from '@components/ui/colors';

import styles from './styles';

type Props = {
    onPress: () => void;
};

export const NavBack = (props: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress} activeOpacity={0.5}>
            <SvgArrowBack width={15} height={15} colorFill={COLORS.COLOR_NAV_ICON} />
        </TouchableOpacity>
    );
};
