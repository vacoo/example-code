import { Action } from 'redux';
import * as Const from '@resources/billing/constants';

// Получить список операций
export interface OperationsFetch {}
export function operations(playload: OperationsFetch): Action & OperationsFetch {
    return {
        type: Const.BILLING_OPERATIONS_FETCH,
        ...playload,
    };
}
