import { combineReducers } from 'redux';

import { reducerUI } from '@resources/ui/reducer';
import { reducerUsers } from '@resources/users/reducer';
import { reducerSuppliers } from '@resources/suppliers/reducer';
import { reducerDrivers } from '@resources/drivers/reducer';
import { reducerBilling } from '@resources/billing/reducer';
import { reducerReports } from '@resources/reports/reducer';
import { reducerOrders } from '@resources/orders/reducer';
import { reducerNotices } from '@resources/notices/reducer';
import { reducerAreas } from '@resources/areas/reducer';

import { State as UI } from '@resources/ui/_state';
import { State as Users } from '@resources/users/_state';
import { State as Suppliers } from '@resources/suppliers/_state';
import { State as Drivers } from '@resources/drivers/_state';
import { State as Billing } from '@resources/billing/_state';
import { State as Reports } from '@resources/reports/_state';
import { State as Orders } from '@resources/orders/_state';
import { State as Notices } from '@resources/notices/_state';
import { State as Areas } from '@resources/areas/_state';

export type GlobalState = {
    ui: UI;
    users: Users;
    suppliers: Suppliers;
    drivers: Drivers;
    billing: Billing;
    reports: Reports;
    orders: Orders;
    notices: Notices;
    areas: Areas;
};

export const reducers = combineReducers({
    ui: reducerUI,
    users: reducerUsers,
    suppliers: reducerSuppliers,
    drivers: reducerDrivers,
    billing: reducerBilling,
    reports: reducerReports,
    orders: reducerOrders,
    notices: reducerNotices,
    areas: reducerAreas,
});
