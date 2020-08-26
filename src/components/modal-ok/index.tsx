import React from 'react';
import { View, Text, Animated, Easing } from 'react-native';

import styles from './styles';
import { SvgCheck } from '@components/icons';
import * as COLORS from '@components/ui/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    show: boolean;
    onClose: () => void;
};

export const ModalOK = (props: Props) => {
    const [animOpacity] = React.useState(new Animated.Value(0));
    const [isDisplay, setIsDisplay] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.show) {
            setIsDisplay(true);
            Animated.timing(animOpacity, {
                toValue: 1,
                duration: 150,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animOpacity, {
                toValue: 0,
                duration: 80,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
            }).start(() => {
                setIsDisplay(false);
            });
        }
    }, [props.show]);

    return (
        <React.Fragment>
            {isDisplay ? (
                <Animated.View
                    style={[
                        styles.container,
                        {
                            opacity: animOpacity,
                        },
                    ]}>
                    <View style={styles.overflow} />
                    <View style={styles.content}>
                        <View style={styles.body}>
                            <SvgCheck width={50} height={50} colorFill={COLORS.COLOR_SUCCESS} />
                            <Text style={styles.title}>Готово</Text>
                            <Text>Откройте Vodopad CRM в браузере:</Text>
                            <Text style={styles.site}>crm.vodopad.org</Text>
                            <Text style={styles.desc}>
                                При поступлении звонка в CRM откроется карточка создания заказа с историей звонящего
                                клиента
                            </Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={props.onClose} style={styles.button}>
                            <Text style={styles.button_text}>Окей я понял (-а)</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            ) : (
                <React.Fragment />
            )}
        </React.Fragment>
    );
};
