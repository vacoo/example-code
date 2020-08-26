import { Supplier } from '@resources/suppliers/_supplier';

export interface State {
    suppliers: Supplier[];

    supplierUpdateUnix: number; // Время изменения формы - доступность для клиентов
}

export const initialState: State = {
    suppliers: [],

    supplierUpdateUnix: 0,
};
