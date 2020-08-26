import { Action } from 'redux';

import * as Const from '@resources/orders/constants';
import * as ConstDrivers from '@resources/drivers/constants';
import * as ConstUsers from '@resources/users/constants';
import * as Api from '@resources/orders/api';
import * as Actions from '@resources/orders/actions';
import { State, initialState } from '@resources/orders/_state';
import { initialOrder, Order, ORDER_GROUP } from '@resources/orders/_order';
import { updateArrayItem, mergeArray, applyArrayDefault } from '@resources/utils';

// Список заказов
function ordersSuccess(state: State, action: Api.OrdersSuccess): State {
    let orders = mergeArray(action.orders, action.ordersCurrent);

    return {
        ...state,
        orders: applyArrayDefault(orders, initialOrder).sort((a, b) => b.id - a.id),
    };
}

// История заказов
function ordersHistorySuccess(state: State, action: Api.OrdersHistorySuccess): State {
    let orders: Order[] = [];

    if (action.lastID) {
        orders = mergeArray(state.ordersHistory, action.orders);
    } else {
        orders = action.orders;
    }

    return {
        ...state,
        ordersHistory: applyArrayDefault(orders, initialOrder).sort((a, b) => b.id - a.id),
    };
}

// Заказ
function orderSuccess(state: State, action: Api.OrderSuccess): State {
    let orders = updateArrayItem(state.orders, action.order.id, (order) => {
        return {
            ...initialOrder,
            ...order,
            ...action.order,
        };
    });

    let order = orders.find((o) => o.id === action.order.id);

    return {
        ...state,
        orders: order ? orders : [...orders, action.order],
    };
}

// Получение заказа
function orderFetch(state: State, action: Actions.OrderFetch): State {
    const isActive = action.orderGroup === ORDER_GROUP.ACTIVE;
    const isHistory = action.orderGroup === ORDER_GROUP.HISTORY;

    return {
        ...state,
        orderID: isActive ? action.order_id : state.orderID,
        orderHistoryID: isHistory ? action.order_id : state.orderHistoryID,
    };
}

// Очистка заказов
function ordersClear(state: State): State {
    return {
        ...state,
        orders: [],
    };
}

export const reducerOrders = (state: State = initialState, action: any): State => {
    switch (action.type) {
        case Const.ORDERS_ORDERS_SUCCESS:
            return ordersSuccess(state, action);

        case Const.ORDERS_ORDERS_HISTORY_SUCCESS:
            return ordersHistorySuccess(state, action);

        case Const.ORDERS_ORDER_FETCH:
            return orderFetch(state, action);

        case Const.ORDERS_ORDER_SUCCESS:
        case Const.ORDERS_ORDER_ACCEPT_SUCCESS:
        case Const.ORDERS_ORDER_IN_WAY_SUCCESS:
        case Const.ORDERS_ORDER_COMPLETE_SUCCESS:
        case Const.ORDERS_ORDER_CANCEL_SUCCESS:
        case Const.ORDERS_ORDER_DETACH_SUCCESS:
        case Const.ORDERS_ORDER_UPDATE_SUCCESS:
            return orderSuccess(state, action);

        case ConstDrivers.DRIVERS_INVITE_ACCEPT_SUCCESS:
        case ConstUsers.USERS_AUTH_LOGOUT_SUCCESS:
            return ordersClear(state);

        default:
            return state;
    }
};
