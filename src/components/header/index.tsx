import React from 'react';
import { View, Text, Image } from 'react-native';

import { GridRow, GridColumn } from '@components/ui/grid';
import * as COLORS from '@components/ui/colors';
import { Button, BUTTON_TYPE } from '@components/ui/button';
import { SvgHelp } from '@components/icons';

import logoTitle from '@assets/vodopad-call-logo.png';

import styles from './styles';

type Props = {
    onPress: () => void;
};

export const Header = (props: Props) => {
    return (
        <GridRow>
            <GridColumn size={60}>
                <Image source={logoTitle} style={{ width: 150, resizeMode: 'contain' }} />
            </GridColumn>
            <GridColumn size={40} style={styles.col_button}>
                <Button
                    icon={<SvgHelp width={15} height={15} colorFill={COLORS.COLOR_INPUT_ICON} />}
                    isSmall={true}
                    onPress={props.onPress}>
                    Помощь
                </Button>
            </GridColumn>
        </GridRow>
    );
};
