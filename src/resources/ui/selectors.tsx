import { createSelector } from 'reselect';

import { MenuContextItem } from '@resources/ui/_menu-item';
import { GlobalState } from '@resources/reducers';
import {
    UsersReq,
    SuppliersReq,
    DriversReq,
    BillingReq,
    ReportReq,
    OrdersReq,
    NoticesReq,
    AreasReq,
} from '@resources/ui/_req';

export const getMenuContext = (state: GlobalState): MenuContextItem[] => state.ui.menuContext;
export const getMenuContextShow = (state: GlobalState): boolean => state.ui.menuContextShow;
export const getUsersReq = (state: GlobalState): UsersReq => state.ui.req.users;
export const getSuppliersReq = (state: GlobalState): SuppliersReq => state.ui.req.suppliers;
export const getProfileReq = (state: GlobalState): boolean => state.ui.req.users.profile;
export const getDriversReq = (state: GlobalState): DriversReq => state.ui.req.drivers;
export const getBillingReq = (state: GlobalState): BillingReq => state.ui.req.billing;
export const getReportReq = (state: GlobalState): ReportReq => state.ui.req.reports;
export const getOrdersReq = (state: GlobalState): OrdersReq => state.ui.req.orders;
export const getNoticesReq = (state: GlobalState): NoticesReq => state.ui.req.notices;
export const getAreasReq = (state: GlobalState): AreasReq => state.ui.req.areas;

// Состояния загрузки заказов
export const getOrdersIDsReq = (state: GlobalState): number[] => state.ui.ordersIDsReq;
