import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { stackNavigatorHeaderTitleStyle, NavLabel, NavBack } from '@components/ui/navigation';

import { AuthSignInScreen } from '@containers/auth/login';
import { TermsPrivacyScreen } from '@containers/terms/privacy';
import { TermsUseScreen } from '@containers/terms/use';

import { GlobalState } from '@resources/reducers';
import { getOptions } from '@resources/users/selectors';
import { toWhatsApp } from '@resources/utils';
import { Options } from '@resources/users/_options';

const Stack = createStackNavigator();

type Props = {
    options: Options;
};

const mapStateToProps = (state: GlobalState): Props => {
    return {
        options: getOptions(state),
    };
};

export const AuthStack = connect(mapStateToProps)((props: Props) => {
    const dispatch = useDispatch();

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
