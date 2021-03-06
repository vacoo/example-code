import { Action } from 'redux';

import * as Const from '@resources/ats/constants';
import { Status } from '@resources/ats/_state';

// Включить/выключить
export interface Toogle {
    enable: boolean;
}
export function toogle(playload: Toogle): Action & Toogle {
    return {
        type: Const.ATS_TOOGLE,
        ...playload,
    };
}

// Установить состояние
export interface StatusSet {
    status: Status;
}
export function statusSet(playload: StatusSet): Action & StatusSet {
    return {
        type: Const.ATS_STATUS_SET,
        ...playload,
    };
}

// Отправить тестовое событие
export function eventCallTestSend(): Action {
    return {
        type: Const.ATS_EVENT_CALL_TEST_SEND,
    };
}

// Запросить разрешение
export function permissionsRequest(): Action {
    return {
        type: Const.ATS_PERMISSIONS_REQUEST,
    };
}
