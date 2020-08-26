import { Action } from 'redux';
import * as Const from '@resources/ui/constants';
import * as ConstOrders from '@resources/orders/constants';
import * as ApiOrders from '@resources/orders/api';
import * as ActionsOrders from '@resources/orders/actions';
import { State, initialState } from '@resources/ui/_state';
import { MenuContextOpen } from '@resources/ui/actions';
import { Alert } from 'react-native';

// Открыть меню
function menuContextOpen(state: State, action: Action & MenuContextOpen): State {
    return {
        ...state,
        menuContext: action.menuContext,
        menuContextShow: true,
    };
}

// Закрыть меню
function menuContextClose(state: State, action: Action): State {
    return {
        ...state,
        menuContextShow: false,
    };
}

const P_FETCH = /FETCH/g;
const P_SUCCESS = /SUCCESS/g;
const P_FAIL = /FAIL/g;

export function loading(state: State, namespace: string, name: string, loading: boolean): State {
    let stateLoad: { [key: string]: any } = state.req;
    return {
        ...state,
        req: {
            ...state.req,
            [namespace]: {
                ...stateLoad[namespace],
                [name]: loading,
            },
        },
    };
}

function getNamespace(action: string): string {
    let parts = action.split('_');
    return parts[0].toLowerCase();
}

function getName(action: string): string {
    let parts = action.split('_');
    if (parts.length >= 2) {
        return parts
            .slice(1, parts.length - 1)
            .join('_')
            .toLowerCase();
    }
    return '';
}

// Состояние загрузки заказов
function orderActionFetch(state: State, action: ActionsOrders.OrderActionFetch): State {
    return {
        ...state,
        ordersIDsReq: [...state.ordersIDsReq, action.order.id],
    };
}

// Убирает состояние загрузки заказа при неудаче
function orderActionDone(state: State, action: ApiOrders.OrderActionDone): State {
    return {
        ...state,
        ordersIDsReq: state.ordersIDsReq.filter((id) => id !== action.orderID),
    };
}

export const reducerUI = (state: State = initialState, action: any): State => {
    const { type } = action;

    switch (action.type) {
        case ConstOrders.ORDERS_ORDER_ACCEPT_FETCH:
        case ConstOrders.ORDERS_ORDER_IN_WAY_FETCH:
        case ConstOrders.ORDERS_ORDER_COMPLETE_FETCH:
        case ConstOrders.ORDERS_ORDER_CANCEL_FETCH:
            return orderActionFetch(state, action);

        case ConstOrders.ORDERS_ORDER_ACCEPT_SUCCESS:
        case ConstOrders.ORDERS_ORDER_IN_WAY_SUCCESS:
        case ConstOrders.ORDERS_ORDER_COMPLETE_SUCCESS:
        case ConstOrders.ORDERS_ORDER_CANCEL_SUCCESS:
        case ConstOrders.ORDERS_ORDER_ACCEPT_FAIL:
        case ConstOrders.ORDERS_ORDER_IN_WAY_FAIL:
        case ConstOrders.ORDERS_ORDER_COMPLETE_FAIL:
        case ConstOrders.ORDERS_ORDER_CANCEL_FAIL:
            return orderActionDone(state, action);
    }

    if (type.match(P_FETCH)) {
        return loading(state, getNamespace(type), getName(type), true);
    }
    if (type.match(P_SUCCESS) || type.match(P_FAIL)) {
        return loading(state, getNamespace(type), getName(type), false);
    }

    switch (action.type) {
        case Const.UI_MENU_CONTEXT_OPEN:
            return menuContextOpen(state, action);
        case Const.UI_MENU_CONTEXT_CLOSE:
            return menuContextClose(state, action);
        default:
            return state;
    }
};
