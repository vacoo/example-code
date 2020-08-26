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