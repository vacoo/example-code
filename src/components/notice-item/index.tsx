import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import { Notice } from '@resources/notices/_notice';
import { GridRow, GridColumn } from '@components/ui/grid';
import { formatDateDDMMM, formatTime } from '@resources/utils/time';

type Props = {
    notice: Notice;
    onPress?: () => void;
    isLast?: boolean;
};

export const NoticeItem = (props: Props) => {
    const { notice } = props;
    return (
        <TouchableOpacity style={styles.container} activeOpacity={props.onPress ? 0.6 : 1} onPress={props.onPress}>
            <GridRow style={[styles.content, props.isLast && styles.is_last]}>
                <GridColumn size={70}>
                    <Text style={styles.msg}>{notice.msg}</Text>
                </GridColumn>
                <GridColumn size={30} style={styles.col_date}>
                    <Text style={styles.date}>{formatDateDDMMM(notice.created_unix)}</Text>
                    <Text style={styles.date}>{formatTime(notice.created_unix)}</Text>
                </GridColumn>
            </GridRow>
        </TouchableOpacity>
    );
};
