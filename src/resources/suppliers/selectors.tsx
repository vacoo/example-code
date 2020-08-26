import { createSelector } from 'reselect';

import { GlobalState } from '@resources/reducers';
import { Supplier, initialSupplier } from '@resources/suppliers/_supplier';

// Служба
export const getSupplierCurrent = (state: GlobalState): Supplier => {
    const supplierID = state.users.profile.supplier_id;
    const supplier = state.suppliers.suppliers.find((supplier) => supplier.id === supplierID);
    return supplier ? supplier : { ...initialSupplier };
};

// Есть ли у пользователя служба
export const getIsSupplier = (state: GlobalState): boolean => getSupplierCurrent(state).id !== 0

// Текущий баланс службы
export const getSupplierBalance = (state: GlobalState): number => {
    return getSupplierCurrent(state).balance;
};

// Время изменения формы - доступность для клиентов
export const getSupplierUpdateUnix = (state: GlobalState): number => state.suppliers.supplierUpdateUnix;
