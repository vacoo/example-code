import { Action } from 'redux';

import * as Const from '@resources/users/constants';
import { USER_ROLE, User } from '@resources/users/_user';
import { LOGIN_TYPE } from '@resources/users/_state';

// Отправка смс
export interface AuthSendSmsFetch {
    login: string;
}
export function authSendSms(playload: AuthSendSmsFetch): Action & AuthSendSmsFetch {
    return {
        type: Const.USERS_AUTH_SMS_SEND_FETCH,
        ...playload,
    };
}

// Вход по номеру телефона
export interface AuthPhoneFetch {
    login: string;
    sms_code: string;
}
export function authPhone(playload: AuthPhoneFetch): Action & AuthPhoneFetch {
    return {
        type: Const.USERS_AUTH_PHONE_FETCH,
        ...playload,
    };
}

// Вход
export interface AuthLoginFetch {
    email: string;
    password: string;
}
export function authLogin(playload: AuthLoginFetch): Action & AuthLoginFetch {
    return {
        type: Const.USERS_AUTH_LOGIN_FETCH,
        ...playload,
    };
}

// Выход из аккаунта
export function authLogout(): Action {
    return {
        type: Const.USERS_AUTH_LOGOUT_FETCH,
    };
}

// Профиль
export function profile(): Action {
    return {
        type: Const.USERS_PROFILE_FETCH,
    };
}

// Выход со всех устройств
export function revoke(): Action {
    return {
        type: Const.USERS_REVOKE_FETCH,
    };
}

// Восстановление ID профиля из хранилища
export interface LocalDataSet {
    profile_id: number;
    role: USER_ROLE;
    push: boolean;
}
export function localDataSet(playload: LocalDataSet): Action & LocalDataSet {
    return {
        type: Const.USERS_LOCAL_DATA_SET,
        ...playload,
    };
}

// Настройки
export function options(): Action {
    return {
        type: Const.USERS_OPTIONS_FETCH,
    };
}

// Изменить тип входа
export interface LoginTypeSet {
    loginType: LOGIN_TYPE;
}
export function loginTypeSet(playload: LoginTypeSet): Action & LoginTypeSet {
    return {
        type: Const.USERS_LOGIN_TYPE_SET,
        ...playload,
    };
}

// Сохранение push настройки
export interface PushSet {
    push: boolean;
}
export function pushSet(playload: PushSet): Action & PushSet {
    return {
        type: Const.USERS_PUSH_SET,
        ...playload,
    };
}

// Включить телефонию
export function atsEnable(): Action {
    return {
        type: Const.USERS_ATS_ENABLE,
    };
}

// Выключить телефонию
export function atsDisable(): Action {
    return {
        type: Const.USERS_ATS_DISABLE,
    };
}

// Обновление профиля
export interface UserUpdateFetch {
    user: User;
}
export function userUpdate(playload: UserUpdateFetch): Action & UserUpdateFetch {
    return {
        type: Const.USERS_USER_UPDATE_FETCH,
        ...playload,
    };
}
