// Users
export interface UsersReq {
    auth_sms_send: boolean;
    auth_phone: boolean;
    auth_login: boolean;
    profile: boolean;
    revoke: boolean;
    user_update: boolean;
}
export const initialUsersReq: UsersReq = {
    auth_sms_send: false,
    auth_phone: false,
    auth_login: false,
    profile: false,
    revoke: false,
    user_update: false,
};

// Suppliers
export interface SuppliersReq {
    supplier: boolean;
    supplier_update: boolean;
}
export const initialSuppliersReq: SuppliersReq = {
    supplier: false,
    supplier_update: false,
};

// Drivers
export interface DriversReq {
    invites: boolean;
    invite_accept: boolean;
}
export const initialDriversReq: DriversReq = {
    invites: false,
    invite_accept: false,
};

// Billing
export interface BillingReq {
    operations: boolean;
}
export const initialBillingReq: BillingReq = {
    operations: false,
};

// Report
export interface ReportReq {
    report: boolean;
}
export const initialReportReq: ReportReq = {
    report: false,
};

// Orders
export interface OrdersReq {
    orders: boolean;
    orders_history: boolean;
    order: boolean;
    order_accept: boolean;
    order_in_way: boolean;
    order_complete: boolean;
    order_cancel: boolean;
    order_detach: boolean;
    order_update: boolean;
}
export const initialOrdersReq: OrdersReq = {
    orders: false,
    orders_history: false,
    order: false,
    order_accept: false,
    order_in_way: false,
    order_complete: false,
    order_cancel: false,
    order_detach: false,
    order_update: false,
};

// Notices
export interface NoticesReq {
    notices: boolean;
}
export const initialNoticesReq: NoticesReq = {
    notices: false,
};

// Areas
export interface AreasReq {
    areas: boolean;
    areas_apply: boolean;
}
export const initialAreasReq: AreasReq = {
    areas: false,
    areas_apply: false,
};
