import { Order, ORDER_GROUP } from '@resources/orders/_order';

export interface State {
    orders: Array<Order>;
    ordersHistory: Array<Order>;

    orderID: number;
    orderHistoryID: number;
}

export const initialState: State = {
    orders: [],
    ordersHistory: [],

    orderID: 0,
    orderHistoryID: 0,
};
