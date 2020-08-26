import React from 'react';
import { Keyboard, Linking } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import * as COLORS from '@components/ui/colors';
import { stackNavigatorHeaderTitleStyle, NavLabel, NavBack, TitleDropdown } from '@components/ui/navigation';

import { AuthSignInScreen } from '@containers/auth/login';
import { TermsPrivacyScreen } from '@containers/terms/privacy';
import { TermsUseScreen } from '@containers/terms/use';

import { GlobalState } from '@resources/reducers';
import { menuContextOpen, menuContextClose } from '@resources/ui/actions';
import { loginTypeSet } from '@resources/users/actions';
import { LOGIN_TYPE } from '@resources/users/_state';
import { getLoginType, getOptions } from '@resources/users/selectors';
import { toWhatsApp } from '@resources/utils';
import { Options } from '@resources/users/_options';

const Stack = createStackNavigator();

type Props = {
    loginType: LOGIN_TYPE;
    options: Options;
};

const mapStateToProps = (state: GlobalState): Props => {
    return {
        loginType: getLoginType(state),
        options: getOptions(state),
    };
};

export const AuthStack = connect(mapStateToProps)((props: Props) => {
    const dispatch = useDispatch();

    const onRoleSwitch = () => {
        Keyboard.dismiss();
        dispatch(
            menuContextOpen({
                menuContext: [
                    {
                        value: 'По номеру',
                        color: COLORS.COLOR_TEXT,
                        onPress: () => {
                            dispatch(menuContextClose());
                            dispatch(loginTypeSet({ loginType: LOGIN_TYPE.PHONE }));
                        },
                    },
                    {
                        value: 'По почте',
                        color: COLORS.COLOR_TEXT,
                        onPress: () => {
                            dispatch(menuContextClose());
                            dispatch(loginTypeSet({ loginType: LOGIN_TYPE.EMAIL }));
                        },
                    },
                ],
            }),
        );
    };

    const titleDropdown = props.loginType === LOGIN_TYPE.PHONE ? 'по номеру' : 'по почте';

    return (
        <Stack.Navigator
            screenOptions={{
                title: 'Авторизация',
                headerTitleStyle: stackNavigatorHeaderTitleStyle,
            }}
            mode="card">
            <Stack.Screen
                name="AuthSignIn"
                component={AuthSignInScreen}
                options={{
                    title: 'Вход',
                    headerRight: () => (
                        <NavLabel
                            label="Поддержка"
                            onPress={() => {
                                toWhatsApp(props.options.support_phone_drive, 'У меня вопрос по входу: ');
                            }}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="TermsPrivacy"
                component={TermsPrivacyScreen}
                options={{
                    title: 'Политика конфиден.',
                    headerLeft: (p) => <NavBack onPress={() => p.onPress && p.onPress()} />,
                }}
            />
            <Stack.Screen
                name="TermsUse"
                component={TermsUseScreen}
                options={{
                    title: 'Пользов. соглашение',
                    headerLeft: (p) => <NavBack onPress={() => p.onPress && p.onPress()} />,
                }}
            />
        </Stack.Navigator>
    );
});
