import { Action } from 'redux';
import * as Const from '@resources/reports/constants';

// Моя статистика
export interface ReportFetch {
    reportDateUnix: number;
}
export function report(playload: ReportFetch): Action & ReportFetch {
    return {
        type: Const.REPORTS_REPORT_FETCH,
        ...playload,
    };
}

// Расчитать зарплату водителей
export interface CalcPay {
    myPay: number;
}
export function calcPay(playload: CalcPay): Action & CalcPay {
    return {
        ...playload,
        type: Const.REPORTS_CALC_PAY,
    };
}
