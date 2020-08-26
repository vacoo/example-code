import { GlobalState } from '@resources/reducers';
import { Report } from '@resources/reports/_report';

// Отчет
export const getReport = (state: GlobalState): Report => state.reports.report;

// Показать за дату
export const getReportDateUnix = (state: GlobalState): number => state.reports.reportDateUnix;

// Моя доля от бутыля
export const getMyPay = (state: GlobalState): number => state.reports.myPay;
