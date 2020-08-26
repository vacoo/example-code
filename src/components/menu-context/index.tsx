import React from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';

import styles from './styles';

import * as COLORS from '@components/ui/colors';

type Props = {
    children: React.ReactChild | React.ReactChild[];
    isShow: boolean;
    isClose: boolean;
    onClose: () => void;
};

export const MenuContext = (props: Props) => {
    const [cont] = React.useState(new Animated.Value(2000));
    const [overlay] = React.useState(new Animated.Value(0));
    const [menuSlide] = React.useState(new Animated.Value(500));
    const [isDisplay, setIsDisplay] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.isShow) {
            Animated.parallel([
                Animated.timing(cont, {
                    toValue: 0,
                    duration: 5,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(overlay, {
                    toValue: 0.5,
                    duration: 400,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(menuSlide, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIsDisplay(true);
            });
        } else {
            Animated.parallel([
                Animated.timing(cont, {
                    toValue: 2000,
                    delay: 200,
                    duration: 50,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(overlay, {
                    toValue: 0,
                    duration: 150,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(menuSlide, {
                    toValue: 400,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIsDisplay(false);
            });
        }
        return () => {};
    }, [props.isShow]);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        {
                            translateX: cont,
                        },
                    ],
                },
            ]}>
            <Animated.View
                style={[
                    styles.overflow,
                    {
                        opacity: overlay,
                    },
                ]}
            />
            {props.children ? (
                <TouchableOpacity activeOpacity={1} style={styles.area_close} onPress={props.onClose} />
            ) : (
                <React.Fragment />
            )}
            <Animated.View
                style={[
                    styles.content,
                    {
                        transform: [
                            {
                                translateY: menuSlide,
                            },
                        ],
                    },
                ]}>
                <View style={styles.content_item}>{props.children}</View>
                {props.isClose ? (
                    <View style={styles.content_item}>
                        <MenuContextItem onPress={props.onClose}>Закрыть</MenuContextItem>
                    </View>
                ) : (
                    <React.Fragment />
                )}
            </Animated.View>
        </Animated.View>
    );
};

type PropsItem = {
    onPress: () => void;
    children: string;
    color?: string;
};

export const MenuContextItem = (props: PropsItem) => {
    return (
        <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={props.onPress}>
            <Text style={[styles.item_text, { color: props.color ? props.color : COLORS.COLOR_TEXT }]}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};
