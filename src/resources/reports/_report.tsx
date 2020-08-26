export interface Report {
    pay: number;

    id: number;
    name: string;

    order_amount: number;
    order_amount_tare: number;
    order_amount_swap: number;

    sum: number;
    sum_tare: number;
    sum_swap: number;

    sum_online: number;
    sum_online_tare: number;
    sum_online_swap: number;

    bottle_amount: number;
    bottle_amount_tare: number;
    bottle_amount_swap: number;
}

export const initialReport: Report = {
    pay: 0,

    id: 0,
    name: '',
    order_amount: 0,
    order_amount_tare: 0,
    order_amount_swap: 0,

    sum: 0,
    sum_tare: 0,
    sum_swap: 0,

    sum_online: 0,
    sum_online_tare: 0,
    sum_online_swap: 0,

    bottle_amount: 0,
    bottle_amount_tare: 0,
    bottle_amount_swap: 0,
};
