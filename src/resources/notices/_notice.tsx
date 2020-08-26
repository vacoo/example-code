export interface Notice {
    id: number;
    msg: string;
    created_at: string;
    created_unix: number;
    order_id: number;
    supplier_id: number;
}

export const initialNotice: Notice = {
    id: 0,
    msg: '',
    created_at: '',
    created_unix: 0,
    order_id: 0,
    supplier_id: 0,
};
