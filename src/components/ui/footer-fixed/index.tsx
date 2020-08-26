import React from 'react';
import { View } from 'react-native';

import styles from './styles';

type Props = {
    children: React.ReactChild | React.ReactChild[];
};

export const FooterFixed = (props: Props) => {
    return <View style={styles.container}>{props.children}</View>;
};

export const FooterBase = () => <View style={styles.base} />;
