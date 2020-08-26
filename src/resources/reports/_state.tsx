import { Report, initialReport } from '@resources/reports/_report';

export interface State {
    report: Report;

    myPay: number;
    reportDateUnix: number; // Показывать за дату
}

export const initialState: State = {
    report: { ...initialReport },

    myPay: 0,
    reportDateUnix: 0,
};
