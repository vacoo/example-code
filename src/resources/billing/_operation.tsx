export enum EXP {
    NONE = 0,
    ACTIVE_SUPPLIER = 1,
    ACTIVE_USER = 2,
    PASSIVE_ORDER_COMPLETE = -1,
    PASSIVE_SUBSCRIBE = -2,
    PASSIVE_DIRECT = -3,
}

export interface Operation {
    id: number;
    debit: EXP;
    credit: EXP;
    sum: number;
    desc: string;
    created_at: string;
    created_unix: number;
    supplier_id: number;
    supplier_name: string;
    user_id: number;
    user_login: string;
    order_id: number;
}

export const initialOperation: Operation = {
    id: 0,
    debit: EXP.NONE,
    credit: EXP.NONE,
    sum: 0,
    desc: '',
    created_at: '',
    created_unix: 0,
    supplier_id: 0,
    supplier_name: '',
    user_id: 0,
    user_login: '',
    order_id: 0,
};
