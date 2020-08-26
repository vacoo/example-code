import { Action } from 'redux';

import * as Const from '@resources/suppliers/constants';
import { Supplier } from '@resources/suppliers/_supplier';

// Служба
export interface SupplierFetch {
    supplier_id: number;
}
export function supplier(playload: SupplierFetch): Action & SupplierFetch {
    return {
        type: Const.SUPPLIERS_SUPPLIER_FETCH,
        ...playload,
    };
}

// Сохранение службы
export interface SupplierUpdateFetch {
    supplier: Supplier;
}
export function supplierUpdate(playload: SupplierUpdateFetch): Action & SupplierUpdateFetch {
    return {
        type: Const.SUPPLIERS_SUPPLIER_UPDATE_FETCH,
        ...playload,
    };
}
