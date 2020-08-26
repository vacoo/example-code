import * as Const from '@resources/suppliers/constants';
import * as Api from '@resources/suppliers/api';
import { State, initialState } from '@resources/suppliers/_state';
import { initialSupplier, Supplier } from '@resources/suppliers/_supplier';
import { updateArrayItem } from '@resources/utils';
import { getNowUnix } from '@resources/utils/time';

// Получение службы
function supplierSuccess(state: State, action: Api.SupplierSuccess): State {
    return {
        ..._supplierSave(state, action.supplier),
    };
}

// Обновление службы
function supplierUpdateSuccess(state: State, action: Api.SupplierSuccess): State {
    return {
        ..._supplierSave(state, action.supplier),
        supplierUpdateUnix: getNowUnix(),
    };
}

// Сохранение службы
function _supplierSave(state: State, supplier: Supplier): State {
    let suppliers = updateArrayItem(state.suppliers, supplier.id, (s) => {
        return {
            ...initialSupplier,
            ...s,
            ...supplier,
        };
    });

    return {
        ...state,
        suppliers: state.suppliers.find((s) => s.id === supplier.id)
            ? suppliers
            : [
                  ...state.suppliers,
                  {
                      ...initialSupplier,
                      ...supplier,
                  },
              ],
    };
}

export const reducerSuppliers = (state: State = initialState, action: any) => {
    switch (action.type) {
        case Const.SUPPLIERS_SUPPLIER_SUCCESS:
            return supplierSuccess(state, action);
        case Const.SUPPLIERS_SUPPLIER_UPDATE_SUCCESS:
            return supplierUpdateSuccess(state, action);

        default:
            return state;
    }
};
