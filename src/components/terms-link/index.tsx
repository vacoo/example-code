import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

type Props = {
    onPrivacy: () => void;
    onUse: () => void;
};

export const TermsLink = (props: Props) => {
    return (
        <Text style={styles.text}>
            Авторизуясь в приложении, вы принимаете условия{' '}
            <Text style={styles.is_mark} onPress={props.onPrivacy}>
                политики конфиденциальности
            </Text>{' '}
            и{' '}
            <Text style={styles.is_mark} onPress={props.onUse}>
                пользовательского соглашения
            </Text>
        </Text>
    );
};
