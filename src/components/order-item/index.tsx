import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import styles from './styles';

import { GridRow, GridColumn } from '@components/ui/grid';
import { Button, BUTTON_TYPE } from '@components/ui/button';
import * as COLORS from '@components/ui/colors';

import { Order, ORDER_STATUS, ORDER_STATUS_LABEL } from '@resources/orders/_order';
import { formatDateDDMMM, formatTime, getNowUnix } from '@resources/utils/time';
import { USER_ROLE } from '@resources/users/_user';

type Props = {
    order: Order;
    role: USER_ROLE;
    duration: number; // Время доставки (в сек.)
    onComplete: () => void;
    onInWay: () => void;
    onAccept: () => void;
    onPress?: () => void;
    isMeta?: boolean;
    isLoading?: boolean;
};

export const OrderItem = (props: Props) => {
    const { order } = props;
    return (
        <TouchableOpacity style={styles.container} activeOpacity={props.onPress ? 0.8 : 1} onPress={props.onPress}>
            <OrderItemProgress order={props.order} duration={props.duration}>
                <View style={styles.content}>
                    <GridRow style={styles.content_head}>
                        <GridColumn size={70}>
                            <OrderStatus status={order.status} />
                            <Text style={styles.address_1}>
                                {order.street} {order.home}
                            </Text>
                            <Text style={styles.address_2}>
                                {[
                                    suff(order.entrance, 'под.'),
                                    suff(order.floor, 'этаж'),
                                    suff(order.apartment, 'кв./оф.'),
                                ]
                                    .filter((a) => a !== '')
                                    .join(', ')}
                            </Text>
                        </GridColumn>
                        <GridColumn size={30}>
                            <OrderItemAction {...props} />
                        </GridColumn>
                    </GridRow>
                    {props.isMeta ? (
                        <Text style={styles.meta}>
                            {[
                                order.amount + ' бут.' + `(${order.with_tare ? 'тара' : 'обмен'})`,
                                formatDateDDMMM(order.created_unix),
                                formatTime(order.created_unix),
                                order.area.area_name,
                            ].join(' • ')}
                        </Text>
                    ) : (
                        <React.Fragment />
                    )}
                    <Text style={[styles.extra, !props.isMeta && styles.is_full]}>{order.extra}</Text>
                </View>
            </OrderItemProgress>
        </TouchableOpacity>
    );
};

const colors = {
    [ORDER_STATUS.NEW]: COLORS.COLOR_SUCCESS,
    [ORDER_STATUS.PROGRESS]: COLORS.COLOR_LINK,
    [ORDER_STATUS.COMPLETE]: COLORS.COLOR_TEXT_PLACEHOLDER,
    [ORDER_STATUS.CANCELED]: COLORS.COLOR_ERROR,
    [ORDER_STATUS.IN_WAY]: COLORS.COLOR_IN_WAY,
};

// Статус
type OrderStatusProps = {
    status: ORDER_STATUS;
};

export const OrderStatus = (props: OrderStatusProps) => {
    const { status } = props;
    return (
        <View style={[styles.status, { backgroundColor: colors[status] }]}>
            <Text style={styles.status_text}>{ORDER_STATUS_LABEL[status]}</Text>
        </View>
    );
};

// Кнопка действия
export const OrderItemAction = (props: Props) => {
    const { order, role } = props;

    return (
        <React.Fragment>
            {role === USER_ROLE.DRIVER ? (
                <React.Fragment>
                    {order.status === ORDER_STATUS.IN_WAY ? (
                        <Button
                            isSmall={true}
                            isLoading={props.isLoading}
                            type={BUTTON_TYPE.SUCCESS_BORDER}
                            onPress={props.onComplete}
                            style={{ paddingVertical: 18 }}>
                            Завершить
                        </Button>
                    ) : (
                        <React.Fragment />
                    )}
                    {order.status === ORDER_STATUS.PROGRESS || order.status === ORDER_STATUS.NEW ? (
                        <Button
                            isSmall={true}
                            isLoading={props.isLoading}
                            type={BUTTON_TYPE.IN_WAY_BORDER}
                            onPress={props.onInWay}
                            style={{ paddingVertical: 18 }}>
                            Взять
                        </Button>
                    ) : (
                        <React.Fragment />
                    )}
                </React.Fragment>
            ) : (
                <React.Fragment />
            )}
            {role === USER_ROLE.MANAGER ? (
                <React.Fragment>
                    {order.status === ORDER_STATUS.NEW ? (
                        <Button
                            isSmall={true}
                            isLoading={props.isLoading}
                            type={BUTTON_TYPE.IN_WAY_BORDER}
                            onPress={props.onAccept}
                            style={{ paddingVertical: 18 }}>
                            Принять
                        </Button>
                    ) : (
                        <React.Fragment />
                    )}
                    {order.status === ORDER_STATUS.IN_WAY || order.status === ORDER_STATUS.PROGRESS ? (
                        <Button
                            isSmall={true}
                            isLoading={props.isLoading}
                            type={BUTTON_TYPE.SUCCESS_BORDER}
                            onPress={props.onComplete}
                            style={{ paddingVertical: 18 }}>
                            Завершить
                        </Button>
                    ) : (
                        <React.Fragment />
                    )}
                </React.Fragment>
            ) : (
                <React.Fragment />
            )}
        </React.Fragment>
    );
};

type OrderItemProgressProps = {
    children: React.ReactChild | React.ReactChild[];
    order: Order;
    duration: number;
};

// Полоска прогресса
export const OrderItemProgress = (props: OrderItemProgressProps) => {
    const { order } = props;

    let now = getNowUnix();
    let range = order.created_unix + props.duration - order.created_unix;
    let left = order.created_unix + props.duration - now;
    let perc = Math.round((left / range) * 100);

    return (
        <View style={styles.progress}>
            {props.duration ? (
                <View
                    style={[
                        styles.progress_active,
                        perc < 20 && styles.progress_active_low,
                        perc >= 20 && perc < 50 && styles.progress_active_middle,
                        perc >= 50 && styles.progress_active_many,
                        { width: (perc > 0 ? perc : 5) + '%' },
                    ]}
                />
            ) : (
                <React.Fragment />
            )}
            <View style={styles.progress_content}>{props.children}</View>
        </View>
    );
};

// Суффикс адреса
function suff(value: string, suff: string): string {
    return value ? suff + ' ' + value : '';
}

// Подтверждение завершения заказа
export const confComplete = (order: Order, onPress: () => void) => {
    Alert.alert('Завершить заказ?', `Заказ по адресу ${order.street} ${order.home} будет помечен как доставлен.`, [
        {
            text: 'Нет',
            onPress: () => {},
            style: 'cancel',
        },
        {
            text: 'Завершить',
            onPress: onPress,
        },
    ]);
};
