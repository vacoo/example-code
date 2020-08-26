import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux';

import * as Const from '@resources/billing/constants';
import * as Request from '@resources/utils/request';
import { Operation } from '@resources/billing/_operation';
import * as Actions from '@resources/billing/actions';

// Получить список операций
export interface OperationsSuccess {
    operations: Array<Operation>;
}
function* operations(action: Action & Actions.OperationsFetch) {
    try {
        let res = yield call(Request.get, '/v3/billing/history', {});

        let success: Action & OperationsSuccess = {
            type: Const.BILLING_OPERATIONS_SUCCESS,
            operations: res.content.billing,
        };
        yield put(success);
    } catch (e) {
        yield put({ type: Const.BILLING_OPERATIONS_FAIL, e });
    }
}

export function* apiBilling() {
    yield takeEvery(Const.BILLING_OPERATIONS_FETCH, operations);
}
