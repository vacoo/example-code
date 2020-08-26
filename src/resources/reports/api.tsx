import AsyncStorage from '@react-native-community/async-storage';

import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux';
import * as Request from '@resources/utils/request';
import * as Const from '@resources/reports/constants';
import * as Actions from '@resources/reports/actions';
import { Report } from '@resources/reports/_report';

// Моя статистика
export interface ReportSuccess {
    report: Report;
}
function* report(action: Action & Actions.ReportFetch) {
    try {
        let res = yield call(Request.get, '/v3/reports/my', {
            date_unix: action.reportDateUnix,
        });

        let success: Action & ReportSuccess = {
            type: Const.REPORTS_REPORT_SUCCESS,
            report: res.content.driver,
        };

        let myPay = yield AsyncStorage.getItem('my_pay');

        yield put(success);
        yield put(Actions.calcPay({ myPay: myPay ? Number(myPay) : 0 }));
    } catch (e) {
        yield put({ type: Const.REPORTS_REPORT_FAIL, e });
    }
}

// Сохранение зарплаты водителей
function* calcPay(action: Action & Actions.CalcPay) {
    yield AsyncStorage.setItem('my_pay', String(action.myPay));
}

export function* apiReports() {
    yield takeEvery(Const.REPORTS_REPORT_FETCH, report);
    yield takeEvery(Const.REPORTS_CALC_PAY, calcPay);
}
