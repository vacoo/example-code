import { Action } from 'redux';
import * as Toast from '@resources/utils/toast';

import * as ConstUsers from '@resources/users/constants';
import * as ConstOrders from '@resources/orders/constants';

export interface ActionError {
    e: Error;
}

// Отключение вывода ошибок для этих действий
const EXCEPTIONS: string[] = [
    ConstUsers.USERS_PROFILE_FAIL,
    ConstUsers.USERS_OPTIONS_FAIL,
    ConstOrders.ORDERS_ORDERS_FAIL,
];

// Отображение сообщений ошибок в запросе
export const middlewareToastFail = (store: any) => (next: (action: Action) => any) => async (
    action: Action & ActionError,
) => {
    if (action.type.match(/FAIL/g) && action.e && EXCEPTIONS.indexOf(action.type) === -1) {
        Toast.showError(action.e.message);
    }

    return next(action);
};
