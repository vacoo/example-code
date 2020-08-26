import { Action } from 'redux';

import * as Const from '@resources/billing/constants';
import { State, initialState } from '@resources/billing/_state';
import * as Api from '@resources/billing/api';
import { initialOperation } from '@resources/billing/_operation';
import { applyArrayDefault } from '@resources/utils';

// Получить список биллинга
function operationsSuccess(state: State, action: Api.OperationsSuccess): State {
    return {
        ...state,
        operations: applyArrayDefault(action.operations, initialOperation),
    };
}

export const reducerBilling = (state: State = initialState, action: any) => {
    switch (action.type) {
        case Const.BILLING_OPERATIONS_SUCCESS:
            return operationsSuccess(state, action);

        default:
            return state;
    }
};
