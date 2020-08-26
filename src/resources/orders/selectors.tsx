import { createSelector } from 'reselect';

import { GlobalState } from '@resources/reducers';
import { Order, initialOrder, ORDER_STATUS, ORDER_GROUP } from '@resources/orders/_order';
import { OrderArea, initialOrderArea } from '@resources/areas/_area';
import { getSupplierCurrent } from '@resources/suppliers/selectors';
import { USER_ROLE } from '@resources/users/_user';
import { getIsDriverAccept } from '@resources/drivers/selectors';

const ORDERS_STATUS_ACTIVE = [ORDER_STATUS.NEW, ORDER_STATUS.PROGRESS, ORDER_STATUS.IN_WAY];

// Список заказов
export const getOrders = (state: GlobalState): Order[] => {
    let orders = state.orders.orders.filter((order) => {
        let isFree = order.driver_id !== state.users.profile.id;
        let isStatus = ORDERS_STATUS_ACTIVE.indexOf(order.status) !== -1;
        return isFree && isStatus;
    });

    if (state.users.profile.role === USER_ROLE.DRIVER && !getIsDriverAccept(state)) {
        return [];
    }

    return extractOrdersAreas(orders, getSupplierCurrent(state).id);
};

// Текущие заказы
export const getOrdersCurrent = (state: GlobalState): Order[] => {
    let orders = state.orders.orders.filter((order) => {
        let isDriver = order.driver_id === state.users.profile.id;
        let isStatus = ORDERS_STATUS_ACTIVE.indexOf(order.status) !== -1;
        return isDriver && isStatus;
    });

    if (state.users.profile.role === USER_ROLE.DRIVER && !getIsDriverAccept(state)) {
        return [];
    }

    return extractOrdersAreas(orders, getSupplierCurrent(state).id);
};

// Количество заказов
export const getOrdersCount = createSelector(getOrders, (orders) => orders.length);

// Количество текущих заказов
export const getOrdersCurrentCount = createSelector(getOrdersCurrent, (orders) => orders.length);

// История заказов
export const getOrdersHistory = (state: GlobalState): Order[] => state.orders.ordersHistory;

// Последний ID заказа из истории
export const getOrdersHistoryLastID = (state: GlobalState): number => {
    const { ordersHistory } = state.orders;

    if (ordersHistory.length) {
        return ordersHistory[ordersHistory.length - 1].id;
    }
    return 0;
};

// Заказ
export const getOrder = (state: GlobalState): Order => {
    let order = state.orders.orders.find((order) => order.id === state.orders.orderID);

    return order
        ? {
              ...order,
              area: decodeOrderArea(order.areas, getSupplierCurrent(state).id),
          }
        : { ...initialOrder };
};

// Заказ из истории
export const getOrderHistory = (state: GlobalState): Order => {
    let order = state.orders.ordersHistory.find((order) => order.id === state.orders.orderHistoryID);

    return order
        ? {
              ...order,
              area: decodeOrderArea(order.areas, getSupplierCurrent(state).id),
          }
        : { ...initialOrder };
};

// Извлечение зоны доставки службы у заказов
function extractOrdersAreas(orders: Order[], supplierID: number): Order[] {
    return orders.map((order) => {
        return {
            ...order,
            area: decodeOrderArea(order.areas, supplierID),
        };
    });
}

// Находит и вытаскивает данные зоны доставки нужной службы
function decodeOrderArea(areas: string, supplierID: number): OrderArea {
    try {
        // Разделяем зоны доставки на части
        let parts = areas.split(';');
        for (let key in parts) {
            // Находим идентификаторы - [supplier_id:area_id]
            let ids = parts[key].match(new RegExp(/^\[\d+:\d+\]/));
            let areaName = parts[key].split(':')[2];

            if (ids) {
                // Убираем квадратные скобки - supplier_id:area_id
                let idsWithoutBrackets = ids[0].slice(1, ids[0].length - 1);

                // Разделяем на части
                let idsDivided = idsWithoutBrackets.split(':');

                // Находим идентификаторы
                let sId = Number(idsDivided[0]);
                let aId = Number(idsDivided[1]);

                if (supplierID === sId) {
                    return {
                        ...initialOrderArea,
                        area_id: aId,
                        area_name: areaName,
                    };
                }
            }
        }
        return {
            ...initialOrderArea,
        };
    } catch (e) {
        return {
            ...initialOrderArea,
        };
    }
}
