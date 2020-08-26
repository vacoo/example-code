import { State, initialState } from '@resources/reports/_state';
import * as Const from '@resources/reports/constants';
import * as ConstOrders from '@resources/orders/constants';
import * as Api from '@resources/reports/api';
import * as Actions from '@resources/reports/actions';
import * as ActionsOrders from '@resources/orders/actions';
import { initialReport } from '@resources/reports//_report';

// Расчитать зарплату водителей
function calcDriversPay(state: State, action: Actions.CalcPay): State {
    let pay = 0;

    if (action.myPay >= 0) {
        pay = state.report.bottle_amount * action.myPay;
    }

    return {
        ...state,
        report: {
            ...initialReport,
            ...state.report,
            pay: pay,
        },
        myPay: action.myPay,
    };
}

// Сохранение фильтра
function reportFetch(state: State, action: Actions.ReportFetch): State {
    return {
        ...state,
        reportDateUnix: action.reportDateUnix,
    };
}

// Статистика водителя
function reportSuccess(state: State, action: Api.ReportSuccess): State {
    return {
        ...state,
        report: {
            ...initialReport,
            ...action.report,
        },
    };
}

// Загрузка истории заказов
function ordersHistoryFetch(state: State, action: ActionsOrders.OrdersHistoryFetch): State {
    return {
        ...state,
        reportDateUnix: action.dateUnix,
    };
}

export const reducerReports = (state: State = initialState, action: any) => {
    switch (action.type) {
        case Const.REPORTS_REPORT_FETCH:
            return reportFetch(state, action);
        case Const.REPORTS_REPORT_SUCCESS:
            return reportSuccess(state, action);
        case Const.REPORTS_CALC_PAY:
            return calcDriversPay(state, action);

        case ConstOrders.ORDERS_ORDERS_HISTORY_FETCH:
            return ordersHistoryFetch(state, action);

        default:
            return state;
    }
};
