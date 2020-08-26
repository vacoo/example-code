import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux';

import * as Actions from '@resources/drivers/actions';
import * as Const from '@resources/drivers/constants';
import * as Request from '@resources/utils/request';
import * as Toast from '@resources/utils/toast';
import { Driver } from '@resources/drivers/_driver';
import { profile } from '@resources/users/actions';

// Список приглашений
export interface InvitesSuccess {
    invites: Driver[];
}
function* invites() {
    try {
        let res = yield call(Request.get, '/v3/drivers/invites');

        let success: Action & InvitesSuccess = {
            invites: res.content.drivers,
            type: Const.DRIVERS_INVITES_SUCCESS,
        };
        yield put(success);
    } catch (e) {
        yield put({ type: Const.DRIVERS_INVITES_FAIL, e });
    }
}

// Принять приглашение
export interface InviteAcceptSuccess {
    invite: Driver;
}
function* inviteAccept(action: Action & Actions.InviteAcceptFetch) {
    try {
        let res = yield call(Request.put, '/v3/drivers/accept/' + action.driver.id);

        let success: Action & InviteAcceptSuccess = {
            invite: res.content.driver,
            type: Const.DRIVERS_INVITE_ACCEPT_SUCCESS,
        };
        yield put(success);
        yield put(profile());

        Toast.showSuccess('Вы подключены к службе ' + success.invite.supplier_name);
    } catch (e) {
        yield put({ type: Const.DRIVERS_INVITE_ACCEPT_FAIL, e });
    }
}

export function* apiDrivers() {
    yield takeEvery(Const.DRIVERS_INVITES_FETCH, invites);
    yield takeEvery(Const.DRIVERS_INVITE_ACCEPT_FETCH, inviteAccept);
}
