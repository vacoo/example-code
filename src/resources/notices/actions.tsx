import { Action } from 'redux';

import * as Const from '@resources/notices/constants';

// Список уведомлений
export function notices(): Action {
    return {
        type: Const.NOTICES_NOTICES_FETCH,
    };
}

// Прочитать все
export function noticesReaded(): Action {
    return {
        type: Const.NOTICES_NOTICES_READED_FETCH,
    };
}
