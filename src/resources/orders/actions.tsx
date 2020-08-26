import { Action, Dispatch } from 'redux';
import { StackNavigationProp } from '@react-navigation/stack';

import * as COLORS from '@components/ui/colors';

import * as Const from '@resources/orders/constants';
import { menuContextOpen, MenuContextOpen, menuContextClose } from '@resources/ui/actions';
import { Order, ORDER_GROUP } from '@resources/orders/_order';

export interface OrderMenuContext {
    order: Order;
    dispatch: Dispatch;
    navigation?: StackNavigationProp<any>;
}
export function orderMenuContext(playload: OrderMenuContext): Action & MenuContextOpen {
    return menuContextOpen({
        menuContext: [
            {
                value: 'Отменить заказ',
                color: COLORS.COLOR_ERROR,
                onPress: () => {
                    playload.dispatch(menuContextClose());
                    playload.dispatch(orderCancel({ order: playload.order }));

                    if (playload.navigation) {
                        playload.navigation.goBack();
                    }
                },
            },
            {
                value: 'Перенести в общий список',
                color: COLORS.COLOR_TEXT,
                onPress: () => {
                    playload.dispatch(menuContextClose());
                    playload.dispatch(orderDetach({ order: playload.order }));

                    if (playload.navigation) {
                        playload.navigation.goBack();
                    }
                },
            },
        ],
    });
}

// Список заказов
export interface OrdersFetch {}
export function orders(): Action & OrdersFetch {
    return {
        type: Const.ORDERS_ORDERS_FETCH,
    };
}

// История заказов
export interface OrdersHistoryFetch {
    dateUnix: number;
    lastID: number;
}
export function ordersHistory(playload: OrdersHistoryFetch): Action & OrdersHistoryFetch {
    return {
        type: Const.ORDERS_ORDERS_HISTORY_FETCH,
        ...playload,
    };
}

// Заказ
export interface OrderFetch {
    order_id: number;
    orderGroup: ORDER_GROUP;
}
export function order(playload: OrderFetch): Action & OrderFetch {
    return {
        type: Const.ORDERS_ORDER_FETCH,
        ...playload,
    };
}

// Принятие заказа
export interface OrderActionFetch {
    order: Order;
}
export function orderAccept(playload: OrderActionFetch): Action & OrderActionFetch {
    return {
        type: Const.ORDERS_ORDER_ACCEPT_FETCH,
        ...playload,
    };
}

// Заказ в пути
export function orderInWay(playload: OrderActionFetch): Action & OrderActionFetch {
    return {
        type: Const.ORDERS_ORDER_IN_WAY_FETCH,
        ...playload,
    };
}

// Завершение заказа
export function orderComplete(playload: OrderActionFetch): Action & OrderActionFetch {
    return {
        type: Const.ORDERS_ORDER_COMPLETE_FETCH,
        ...playload,
    };
}

// Отмена заказа
export function orderCancel(playload: OrderActionFetch): Action & OrderActionFetch {
    return {
        type: Const.ORDERS_ORDER_CANCEL_FETCH,
        ...playload,
    };
}

// Открепится от заказа
export function orderDetach(playload: OrderActionFetch): Action & OrderActionFetch {
    return {
        type: Const.ORDERS_ORDER_DETACH_FETCH,
        ...playload,
    };
}

// Редактирование заказа
export function orderUpdate(playload: OrderActionFetch): Action & OrderActionFetch {
    return {
        type: Const.ORDERS_ORDER_UPDATE_FETCH,
        ...playload,
    };
}

// Запуск получения списка заказов в фоновом режиме
export function ordersLongpollStart(): Action {
    return {
        type: Const.ORDERS_ORDERS_LONGPOLL_START,
    };
}

// Остановка получения списка заказов в фоновом режиме
export function ordersLongpollStop(): Action {
    return {
        type: Const.ORDERS_ORDERS_LONGPOLL_STOP,
    };
}

// Поделится по whatsapp
export interface WhatsappShare {
    order: Order;
}
export function orderWhatsappShare(playload: WhatsappShare): Action & WhatsappShare {
    return {
        type: Const.ORDERS_ORDER_WHATSAPP_SHARE,
        ...playload,
    };
}
