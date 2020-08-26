import { Action } from 'redux';

import * as Const from '@resources/ats/constants';
import { Status } from '@resources/ats/_state';
import { EventCall } from '@resources/ats/_event-call';

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

// Отправить событие
export interface EventCallSend {
    eventCall: EventCall;
}
export function eventCallSend(playload: EventCallSend): Action & EventCallSend {
    return {
        type: Const.ATS_EVENT_CALL_SEND,
        ...playload,
    };
}
