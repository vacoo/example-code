import { call, put, takeEvery, take, fork, cancel, delay, cancelled } from 'redux-saga/effects';
import { Action } from 'redux';
import { Linking } from 'react-native';

import * as Request from '@resources/utils/request';
import * as Const from '@resources/orders/constants';
import * as Actions from '@resources/orders/actions';
import { Order, ORDER_STATUS, ORDER_STATUS_LABEL } from '@resources/orders/_order';
import { Driver } from '@resources/drivers/_driver';
import { formatDateYYYYMMDD, formatTime } from '@resources/utils/time';

// Получение списка заказов
export interface OrdersSuccess {
    orders: Array<Order>;
    ordersCurrent: Array<Order>;
    balance: number;
    unreadedCount: number;
    driver: Driver;
}
function* orders(action: Action & Actions.OrdersFetch) {
    try {
        let res = yield call(Request.get, '/v3/orders', {});

        let success: Action & OrdersSuccess = {
            type: Const.ORDERS_ORDERS_SUCCESS,
            orders: res.content.items,
            ordersCurrent: res.content.orders_cur,
            balance: res.content.balance,
            unreadedCount: res.content.unreaded_count,
            driver: res.content.driver,
        };
        yield put(success);
    } catch (e) {
        yield put({ type: Const.ORDERS_ORDERS_FAIL, e });
    }
}

// Получение истории заказов
export interface OrdersHistorySuccess {
    orders: Array<Order>;
    lastID: number;
}
function* ordersHistory(action: Action & Actions.OrdersHistoryFetch) {
    try {
        let res = yield call(Request.get, '/v3/orders-history', {
            date_unix: action.dateUnix,
            last_id: action.lastID,
        });

        let success: Action & OrdersHistorySuccess = {
            type: Const.ORDERS_ORDERS_HISTORY_SUCCESS,
            orders: res.content.orders,
            lastID: action.lastID,
        };
        yield put(success);
    } catch (e) {
        yield put({ type: Const.ORDERS_ORDERS_HISTORY_FAIL, e });
    }
}

// Заказ
export interface OrderSuccess {
    order: Order;
}
export interface OrderActionDone {
    orderID: number;
}
function* order(action: Action & Actions.OrderFetch) {
    try {
        let res = yield call(Request.get, '/v3/orders/' + action.order_id);

        let success: Action & OrderSuccess = {
            type: Const.ORDERS_ORDER_SUCCESS,
            order: res.content.item,
        };
        yield put(success);
    } catch (e) {
        yield put({ type: Const.ORDERS_ORDER_FAIL, e });
    }
}

// Принятие заказа
function* orderAccept(action: Action & Actions.OrderActionFetch) {
    try {
        let res = yield call(Request.put, '/v3/orders/accept/' + action.order.id, {
            status: ORDER_STATUS.PROGRESS,
        });

        let success: Action & OrderSuccess & OrderActionDone = {
            type: Const.ORDERS_ORDER_ACCEPT_SUCCESS,
            order: res.content.item,
            orderID: res.content.item.id,
        };
        yield put(success);
    } catch (e) {
        let fail: Action & OrderActionDone = {
            type: Const.ORDERS_ORDER_ACCEPT_FAIL,
            orderID: action.order.id,
        };
        yield put({ ...fail, e });
    }
}

// Заказ в пути
function* orderInWay(action: Action & Actions.OrderActionFetch) {
    try {
        let res = yield call(Request.put, '/v3/orders/in-way/' + action.order.id);

        let success: Action & OrderSuccess & OrderActionDone = {
            type: Const.ORDERS_ORDER_IN_WAY_SUCCESS,
            order: res.content.order,
            orderID: res.content.order.id,
        };
        yield put(success);
    } catch (e) {
        let fail: Action & OrderActionDone = {
            type: Const.ORDERS_ORDER_IN_WAY_FAIL,
            orderID: action.order.id,
        };
        yield put({ ...fail, e });
    }
}

// Завершение заказа
function* orderComplete(action: Action & Actions.OrderActionFetch) {
    try {
        let res = yield call(Request.put, '/v3/orders/complete/' + action.order.id, {
            status: ORDER_STATUS.COMPLETE,
        });

        let success: Action & OrderSuccess & OrderActionDone = {
            type: Const.ORDERS_ORDER_COMPLETE_SUCCESS,
            order: res.content.item,
            orderID: res.content.item.id,
        };
        yield put(success);
    } catch (e) {
        let fail: Action & OrderActionDone = {
            type: Const.ORDERS_ORDER_COMPLETE_FAIL,
            orderID: action.order.id,
        };
        yield put({ ...fail, e });
    }
}

// Отмена заказа
function* orderCancel(action: Action & Actions.OrderActionFetch) {
    try {
        let res = yield call(Request.put, '/v3/orders/cancel/' + action.order.id, {
            status: ORDER_STATUS.CANCELED,
        });

        let success: Action & OrderSuccess & OrderActionDone = {
            type: Const.ORDERS_ORDER_CANCEL_SUCCESS,
            order: res.content.item,
            orderID: res.content.item.id,
        };
        yield put(success);
    } catch (e) {
        let fail: Action & OrderActionDone = {
            type: Const.ORDERS_ORDER_CANCEL_FAIL,
            orderID: action.order.id,
        };
        yield put({ ...fail, e });
    }
}

// Открепится от заказа
function* orderDetach(action: Action & Actions.OrderActionFetch) {
    try {
        let res = yield call(Request.put, '/v3/orders/detach/' + action.order.id);

        let success: Action & OrderSuccess = {
            type: Const.ORDERS_ORDER_DETACH_SUCCESS,
            order: res.content.order,
        };
        yield put(success);
    } catch (e) {
        yield put({ type: Const.ORDERS_ORDER_DETACH_FAIL, e });
    }
}

// Получение списка заказов в фоновом режиме
function* ordersLongpoll() {
    try {
        while (true) {
            try {
                let res = yield call(Request.get, '/v3/orders', {
                    longpoll: true,
                });

                let putAction: Action & OrdersSuccess = {
                    type: Const.ORDERS_ORDERS_SUCCESS,
                    orders: res.content.items,
                    ordersCurrent: res.content.orders_cur,
                    balance: res.content.balance,
                    unreadedCount: res.content.unreaded_count,
                    driver: res.content.driver,
                };
                yield put(putAction);
            } catch (e) {
                yield put({ type: Const.ORDERS_ORDERS_FAIL, e });
                yield delay(3000);
            }
        }
    } finally {
        if (yield cancelled()) {
            console.log('CANCELLED');
        }
    }
}

// Обновление заказа
function* orderUpdate(action: Action & Actions.OrderActionFetch) {
    try {
        const { order } = action;

        // Прерываем получение заказов в фоновом режима из за эффекта "старого стейта"
        yield put(Actions.ordersLongpollStop());

        let res = yield call(Request.put, '/v3/orders/edit/' + order.id, {
            mobile_pay: Number(order.mobile_pay),
            with_tare: Number(order.with_tare),
            amount: order.amount,
        });
        let success: Action & OrderSuccess = {
            type: Const.ORDERS_ORDER_UPDATE_SUCCESS,
            order: res.content.order,
        };
        yield put(success);

        yield put(Actions.ordersLongpollStart());
    } catch (e) {
        yield put({ type: Const.ORDERS_ORDER_UPDATE_FAIL, e });
    }
}

// Поделится по whatsapp
function* orderWhatsappShare({ order }: Action & Actions.OrderActionFetch) {
    const DIVIDER = `--------------------`;
    let extra = order.extra.trim();

    let text: Array<string> = [
        `*${order.street}, ${order.home}*`,
        `*под. ${order.entrance ? order.entrance : '-'}, этаж ${order.floor ? order.floor : '-'}, кв/офис ${
            order.apartment ? order.apartment : '-'
        }*`,
        extra ? [DIVIDER, extra].join('\n') : '',
        DIVIDER,
        `${order.amount} бут. (${order.with_tare ? 'с тарой' : 'обмен'})`,
        DIVIDER,
        `${order.price} Р ${order.mobile_pay ? 'мобильный банк' : 'наличка'}`,
        DIVIDER,
        `Клиент: ${order.user_phone}`,
        `Создан: ${formatDateYYYYMMDD(order.created_unix)} ${formatTime(order.created_unix)}`,
        DIVIDER,
        `*Заказ №${order.id}* | ${ORDER_STATUS_LABEL[order.status]}`,
    ].filter((t) => t !== '');

    Linking.openURL('https://api.whatsapp.com/send?text=' + encodeURIComponent(text.join('\n')));
}

function* _ordersLongpollStart() {
    yield delay(1000);
    yield put(Actions.ordersLongpollStart());
}

export function* apiOrders() {
    yield fork(_ordersLongpollStart);

    yield takeEvery(Const.ORDERS_ORDERS_FETCH, orders);
    yield takeEvery(Const.ORDERS_ORDERS_HISTORY_FETCH, ordersHistory);
    yield takeEvery(Const.ORDERS_ORDER_FETCH, order);
    yield takeEvery(Const.ORDERS_ORDER_ACCEPT_FETCH, orderAccept);
    yield takeEvery(Const.ORDERS_ORDER_IN_WAY_FETCH, orderInWay);
    yield takeEvery(Const.ORDERS_ORDER_COMPLETE_FETCH, orderComplete);
    yield takeEvery(Const.ORDERS_ORDER_CANCEL_FETCH, orderCancel);
    yield takeEvery(Const.ORDERS_ORDER_DETACH_FETCH, orderDetach);
    yield takeEvery(Const.ORDERS_ORDER_UPDATE_FETCH, orderUpdate);
    yield takeEvery(Const.ORDERS_ORDER_WHATSAPP_SHARE, orderWhatsappShare);

    while (yield take(Const.ORDERS_ORDERS_LONGPOLL_START)) {
        const longPollGetList = yield fork(ordersLongpoll);
        yield take(Const.ORDERS_ORDERS_LONGPOLL_STOP);
        yield cancel(longPollGetList);
    }
}
