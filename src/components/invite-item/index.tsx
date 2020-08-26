import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

import { GridRow, GridColumn } from '@components/ui/grid';

import { Driver } from '@resources/drivers/_driver';
import { formatDateYYYYMMDD, formatTime } from '@resources/utils/time';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    driver: Driver;
    isLast?: boolean;
    onPress?: () => void;
};

export const InviteItem = (props: Props) => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={props.onPress}>
            <GridRow style={[styles.content, props.isLast && styles.is_last]}>
                <GridColumn size={70}>
                    <Text style={styles.name_text}>{props.driver.supplier_name}</Text>
                    <Text style={[styles.label, !props.driver.accept && styles.current_text]}>
                        {props.driver.accept ? 'Текущая служба' : 'Новое приглашение'}
                    </Text>
                </GridColumn>
                <GridColumn size={30} style={styles.col_date}>
                    <Text style={styles.created_at}>{formatDateYYYYMMDD(props.driver.created_unix)}</Text>
                    <Text style={styles.created_at}>{formatTime(props.driver.created_unix)}</Text>
                </GridColumn>
            </GridRow>
        </TouchableOpacity>
    );
};
