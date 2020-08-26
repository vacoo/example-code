import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

import { GridRow, GridColumn } from '@components/ui/grid';

type Props = {
    children: React.ReactChild | React.ReactChild[];
    label: string;
};

export const FormLabel = (props: Props) => {
    return (
        <GridRow style={styles.container}>
            <GridColumn size={35} style={styles.col_label}>
                <Text style={styles.label}>{props.label}</Text>
            </GridColumn>
            <GridColumn size={65} style={styles.content}>
                {props.children}
            </GridColumn>
        </GridRow>
    );
};

export const FormLabelHead = (props: { label: string }) => <Text style={styles.label_head}>{props.label}</Text>;
