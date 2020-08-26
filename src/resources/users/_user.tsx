export enum USER_ROLE {
    CLIENT = 'client',
    DRIVER = 'driver',
    MANAGER = 'manager',
    SUPERUSER = 'superuser',
}

export const USER_ROLE_LABEL = {
    [USER_ROLE.CLIENT]: 'Клиент',
    [USER_ROLE.DRIVER]: 'Водитель',
    [USER_ROLE.MANAGER]: 'Менеджер',
    [USER_ROLE.SUPERUSER]: 'Суперпользователь',
};

export interface User {
    id: number;
    name: string;
    login: string;
    email: string;
    role: USER_ROLE;
    city_id: number;
    city_name: string;
    city_timezone: string;
    supplier_id: number;
    supplier_name: string;
    created_at: number;
    unreaded_count: number;
    for_suppliers: number[];
    ban: boolean;
}

export const initialUser: User = {
    id: 0,
    name: '-',
    login: '',
    email: '',
    role: USER_ROLE.CLIENT,
    city_id: 0,
    city_name: '',
    city_timezone: '',
    supplier_id: 0,
    supplier_name: '',
    created_at: 0,
    unreaded_count: 0,
    for_suppliers: [],
    ban: false,
};
