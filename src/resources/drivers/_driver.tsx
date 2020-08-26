export interface Driver {
    id: number;
    user_id: number;
    supplier_id: number;
    supplier_name: string;
    created_at: string;
    created_unix: number;
    accept: boolean;
    user_login: string;
    user_name: string;
    areas: Array<number>;
}

export const initialDriver: Driver = {
    id: 0,
    user_id: 0,
    supplier_id: 0,
    supplier_name: '',
    created_at: '',
    created_unix: 0,
    accept: false,
    user_login: '',
    user_name: '',
    areas: [],
};
