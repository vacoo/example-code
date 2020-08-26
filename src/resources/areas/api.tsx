import { call, put, takeEvery, all } from 'redux-saga/effects';
import { Action } from 'redux';
import OneSignal from 'react-native-onesignal';

import * as Const from '@resources/areas/constants';
import * as Request from '@resources/utils/request';
import { Area } from '@resources/areas/_area';
import * as Actions from '@resources/areas/actions';
import * as OrdersActions from '@resources/orders/actions';

// Список зон доставок
export interface AreasSuccess {
    areas: Array<Area>;
}
function* areas(action: Action) {
    try {
        let res = yield call(Request.get, '/v3/areas');
        let success: Action & AreasSuccess = {
            type: Const.AREAS_AREAS_SUCCESS,
            areas: res.content.areas,
        };
        yield put(success);
    } catch (e) {
        yield put({ type: Const.AREAS_AREAS_FAIL });
    }
}

// Применить выбранные зоны доставки
export interface AreasApplySuccess {}
function* areasApply(action: Action & Actions.AreasApplyFetch) {
    try {
        let res = yield call(Request.put, '/v3/drivers/areas/' + action.driverID, {
            area_ids: action.selectedAreas.join(','),
        });

        let success: Action & AreasApplySuccess = {
            type: Const.AREAS_AREAS_APPLY_SUCCESS,
        };

        yield all([
            put(success),
            put(OrdersActions.ordersLongpollStop()),
            put(OrdersActions.orders()),
            put(OrdersActions.ordersLongpollStart()),
        ]);
        _setAreasOneSignal(action.selectedAreas, action.areas);
    } catch (e) {
        yield put({ type: Const.AREAS_AREAS_APPLY_FAIL });
    }
}

function _setAreasOneSignal(selectedAreas: Array<number>, areas: Array<Area>) {
    let tags: any = {};

    for (let key in selectedAreas) {
        tags['z' + selectedAreas[key]] = true;
    }

    for (var key in areas) {
        if (selectedAreas.indexOf(areas[key].id) === -1) {
            OneSignal.deleteTag('z' + areas[key].id);
        }
    }

    OneSignal.sendTags(tags);
}

export function* apiAreas() {
    yield takeEvery(Const.AREAS_AREAS_FETCH, areas);
    yield takeEvery(Const.AREAS_AREAS_APPLY_FETCH, areasApply);
}
