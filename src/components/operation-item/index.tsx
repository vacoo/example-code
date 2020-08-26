import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

import { GridRow, GridColumn } from '@components/ui/grid';

import { numberWithSpaces } from '@resources/utils';
import { Operation } from '@resources/billing/_operation';
import { dateToUnix, formatDateYYYYMMDD } from '@resources/utils/time';

type Props = {
    operation: Operation;
    isLast?: boolean;
};

export const OperationItem = (props: Props) => {
    const { operation } = props;

    const isPlus = operation.debit > 0 && operation.credit < 0;

    return (
        <View style={styles.container}>
            <GridRow style={[styles.content, props.isLast && styles.is_last]}>
                <GridColumn size={70}>
                    <Text style={[styles.sum_text, isPlus && styles.is_plus]}>
                        {isPlus ? '+' : ''}
                        {numberWithSpaces(operation.sum)} р.
                    </Text>
                    <Text style={styles.desc}>{operation.desc}</Text>
                </GridColumn>
                <GridColumn size={30} style={styles.col_date}>
                    <Text style={styles.created_at}>{formatDateYYYYMMDD(props.operation.created_unix)}</Text>
                </GridColumn>
            </GridRow>
        </View>
    );
};
