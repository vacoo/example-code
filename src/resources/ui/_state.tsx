import { MenuContextItem } from '@resources/ui/_menu-item';
import {
    UsersReq,
    initialUsersReq,
    SuppliersReq,
    initialSuppliersReq,
    DriversReq,
    initialDriversReq,
    BillingReq,
    initialBillingReq,
    ReportReq,
    initialReportReq,
    OrdersReq,
    initialOrdersReq,
    NoticesReq,
    initialNoticesReq,
    AreasReq,
    initialAreasReq,
} from '@resources/ui/_req';

// Группа состояний загрузки
export interface StateReq {
    users: UsersReq;
    suppliers: SuppliersReq;
    drivers: DriversReq;
    billing: BillingReq;
    reports: ReportReq;
    orders: OrdersReq;
    notices: NoticesReq;
    areas: AreasReq;
}
export const initialStateReq: StateReq = {
    users: { ...initialUsersReq },
    suppliers: { ...initialSuppliersReq },
    drivers: { ...initialDriversReq },
    billing: { ...initialBillingReq },
    reports: { ...initialReportReq },
    orders: { ...initialOrdersReq },
    notices: { ...initialNoticesReq },
    areas: { ...initialAreasReq },
};

// Состояние UI
export interface State {
    menuContextShow: boolean;
    menuContext: MenuContextItem[];

    req: StateReq;

    ordersIDsReq: number[];
}
export const initialState: State = {
    menuContextShow: false,
    menuContext: [],

    req: {
        ...initialStateReq,
    },

    ordersIDsReq: [],
};
