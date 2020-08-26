import { Dispatch, Action } from 'redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type NavigationRoute<P> = {
    name: string;
    key: string;
    params: P;
};

export type StackNavigationProps<P> = {
    route: NavigationRoute<P>;
    dispatch: Dispatch<Action>;
    navigation: StackNavigationProp<any>;
};

export type BottomTabNavigationProps<P> = {
    route: NavigationRoute<P>;
    dispatch: Dispatch<Action>;
    navigation: BottomTabNavigationProp<any>;
};
