import React from 'react';
import {} from 'react-native';
import { useDispatch, connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { stackNavigatorHeaderTitleStyle } from '@components/ui/navigation';

import { AuthStack } from '@containers/auth';
import { MainScreen } from '@containers/main';
import { HelpScreen } from '@containers/help';

import { GlobalState } from '@resources/reducers';
import { getIsAuth, getProfileID } from '@resources/users/selectors';

const Stack = createStackNavigator();

type Props = {
    isAuth: boolean;
    profileID: number;
};

const mapStateToProps = (state: GlobalState): Props => {
    return {
        isAuth: getIsAuth(state),
        profileID: getProfileID(state),
    };
};

export const MainStacks = connect(mapStateToProps)((props: Props) => {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            {props.isAuth || props.profileID ? (
                <Stack.Navigator
                    screenOptions={{
                        title: 'Заказы',
                        headerTitleStyle: stackNavigatorHeaderTitleStyle,
                    }}
                    mode="card">
                    <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
                    <Stack.Screen
                        name="Help"
                        component={HelpScreen}
                        options={{
                            title: 'Помощь',
                        }}
                    />
                </Stack.Navigator>
            ) : (
                <AuthStack />
            )}
        </React.Fragment>
    );
});
