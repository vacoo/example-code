import { OrderArea, initialOrderArea } from '@resources/areas/_area';

// Группировка заказов по признаку
export enum ORDER_GROUP {
    ACTIVE = 'ACTIVE',
    HISTORY = 'HISTORY',
}

export const ORDER_DURATION = 60 * 60; // Время доставки заказа (1 час)

export enum ORDER_STATUS {
    NEW = 1,
    PROGRESS = 2,
    COMPLETE = 3,
    CANCELED = 4,
    IN_WAY = 5,
}

export const ORDER_STATUS_LABEL = {
    [ORDER_STATUS.NEW]: 'Новый',
    [ORDER_STATUS.PROGRESS]: 'Принят',
    [ORDER_STATUS.COMPLETE]: 'Завершен',
    [ORDER_STATUS.CANCELED]: 'Отменен',
    [ORDER_STATUS.IN_WAY]: 'В пути',
};

export interface Order {
    area: OrderArea;

    id: number;
    status: ORDER_STATUS;
    datetime: string;
    lat: number;
    lon: number;
    city_id: number;
    areas: string;

    amount: number;
    with_tare: boolean;
    price: number;
    mobile_pay: boolean;
    extra: string;

    street: string;
    home: string;
    entrance: string;
    floor: string;
    apartment: string;

    supplier_id: number;
    supplier_name: string;
    supplier_phones: string[];

    user_id: number;
    user_name: string;
    user_phone: string;

    driver_id: number;
    driver_name: number;
    driver_login: string;

    created_unix: number;
}

export const initialOrder: Order = {
    area: { ...initialOrderArea },

    id: 0,
    status: 0,
    datetime: '',
    lat: 0,
    lon: 0,
    city_id: 0,
    areas: '',

    amount: 0,
    with_tare: false,
    price: 0,
    mobile_pay: false,
    extra: '',

    street: '',
    home: '',
    entrance: '',
    floor: '',
    apartment: '',

    supplier_id: 0,
    supplier_name: '',
    supplier_phones: [],

    user_id: 0,
    user_name: '',
    user_phone: '',

    driver_id: 0,
    driver_name: 0,
    driver_login: '',

    created_unix: 0,
};
