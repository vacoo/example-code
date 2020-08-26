import { Action } from 'redux';

import * as Const from '@resources/drivers/constants';
import { Driver } from '@resources/drivers/_driver';

// Список приглашений
export function invites(): Action {
    return {
        type: Const.DRIVERS_INVITES_FETCH,
    };
}

// Принять приглашение
export interface InviteAcceptFetch {
    driver: Driver;
}
export function inviteAccept(playload: InviteAcceptFetch): Action & InviteAcceptFetch {
    return {
        type: Const.DRIVERS_INVITE_ACCEPT_FETCH,
        ...playload,
    };
}
