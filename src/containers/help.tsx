import React from 'react';
import { Text, Image, Linking, Alert } from 'react-native';
import { connect, useDispatch } from 'react-redux';
const packageJSON = require('@root/package.json');

import demoImage from '@assets/demo.png';

import { Wrapper } from '@components/wrapper';
import { Box } from '@components/ui/box';
import * as COLORS from '@components/ui/colors';
import { ListItem, ListItemText } from '@components/ui/list';

import { GlobalState } from '@resources/reducers';
import { BottomTabNavigationProps } from '@resources/navigation-props';
import { toWhatsApp } from '@resources/utils';
import { Options } from '@resources/users/_options';
import { getOptions } from '@resources/users/selectors';
import { authLogout } from '@resources/users/actions';

type Props = {
    options: Options;
};

const mapStateToProps = (state: GlobalState): Props => {
    return {
        options: getOptions(state),
    };
};

export const HelpScreen = connect(mapStateToProps)((props: BottomTabNavigationProps<any> & Props) => {
    const dispatch = useDispatch();

    const onLogout = () => {
        Alert.alert('Вы уверены?', '', [
            {
                text: 'Закрыть',
                style: 'cancel',
                onPress: () => {},
            },
            {
                text: 'Да',
                onPress: () => {
                    dispatch(authLogout());
                },
            },
        ]);
    };

    return (
        <Wrapper isContrast={false}>
            <Box isHorizontalSpace={true} isTopSpace={true}>
                <Text>Мобильное приложение Vodopad Call нужна для передачи событий звонка в Vodopad CRM. </Text>
                <Image source={demoImage} style={{ resizeMode: 'contain', width: '100%', height: 100 }} />
                <Text style={{ marginBottom: 10 }}>
                    Для корректной передачи события нужно подключится к WI-FI точке и предоставить разрешения на чтение
                    телефонных вызовов
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    У некоторых Android устройств может быть включен режим энергосбережения. Отключите его зайдя в
                    настройки телефона.
                </Text>
                <Text style={{ marginBottom: 10 }}>Если вы у вас возникли сложности напишите в техподдержку</Text>
            </Box>
            <ListItem
                label="Веб-сайт"
                onPress={() => {
                    Linking.openURL('https://crm.vodopad.org');
                }}>
                <ListItemText>crm.vodopad.org</ListItemText>
            </ListItem>
            <ListItem
                label="Техподдержка (whatsapp)"
                onPress={() => {
                    toWhatsApp(props.options.support_phone_drive, 'У меня вопрос: ');
                }}>
                <ListItemText>Написать</ListItemText>
            </ListItem>
            <ListItem label="Версия">
                <ListItemText>{packageJSON.version}</ListItemText>
            </ListItem>
            <ListItem label="Выйти из аккаунта" labelStyle={{ color: COLORS.COLOR_ERROR }} onPress={onLogout} />
        </Wrapper>
    );
});
