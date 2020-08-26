import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import OneSignal from 'react-native-onesignal';

import * as Const from '@resources/suppliers/constants';
import * as Actions from '@resources/suppliers/actions';
import * as Request from '@resources/utils/request';
import * as Toast from '@resources/utils/toast';
import { Supplier } from '@resources/suppliers/_supplier';

// Служба
export interface SupplierSuccess {
    supplier: Supplier;
}
function* supplier(action: Action & Actions.SupplierFetch) {
    try {
        let res = yield call(Request.get, '/v3/suppliers/' + action.supplier_id);

        let success: Action & SupplierSuccess = {
            type: Const.SUPPLIERS_SUPPLIER_SUCCESS,
            supplier: res.content.supplier,
        };
        yield put(success);
    } catch (e) {
        yield put({ type: Const.SUPPLIERS_SUPPLIER_FAIL, e });
    }
}

// Обновление службы
function* supplierUpdate(action: Action & Actions.SupplierUpdateFetch) {
    try {
        let res = yield call(Request.put, '/v3/suppliers/' + action.supplier.id, {
            ...action.supplier,
        });

        let success: Action & SupplierSuccess = {
            type: Const.SUPPLIERS_SUPPLIER_UPDATE_SUCCESS,
            supplier: res.content.supplier,
        };
        yield put(success);
    } catch (e) {
        yield put({ type: Const.SUPPLIERS_SUPPLIER_UPDATE_FAIL, e });
    }
}

export function* apiSuppliers() {
    yield takeEvery(Const.SUPPLIERS_SUPPLIER_FETCH, supplier);
    yield takeEvery(Const.SUPPLIERS_SUPPLIER_UPDATE_FETCH, supplierUpdate);
}
