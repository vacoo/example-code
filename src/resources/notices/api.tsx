import { call, put, takeEvery, all } from 'redux-saga/effects';
import { Action } from 'redux';
import * as Request from '@resources/utils/request';
import * as Const from '@resources/notices/constants';
import { Notice } from '@resources/notices/_notice';

// Список уведомлений
export interface NoticesSuccess {
    notices: Array<Notice>;
    unreaded_count: number;
}
function* notices(action: Action) {
    try {
        let res = yield call(Request.get, '/v3/notifications');

        let putAction: Action & NoticesSuccess = {
            type: Const.NOTICES_NOTICES_SUCCESS,
            notices: res.content.notifications,
            unreaded_count: res.content.unreaded_count,
        };
        yield all([put(putAction)]);
    } catch (e) {
        yield put({ type: Const.NOTICES_NOTICES_FAIL, e });
    }
}

// Прочитать все
function* noticesReaded(action: Action) {
    try {
        let res = yield call(Request.put, '/v3/notifications/readed-all');
        let success: Action = {
            type: Const.NOTICES_NOTICES_READED_SUCCESS,
        };
        yield put(success);
    } catch (e) {
        yield put({ type: Const.NOTICES_NOTICES_READED_FAIL, e });
    }
}

export function* apiNotices() {
    yield takeEvery(Const.NOTICES_NOTICES_FETCH, notices);
    yield takeEvery(Const.NOTICES_NOTICES_READED_FETCH, noticesReaded);
}
