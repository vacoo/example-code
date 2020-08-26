import { call, put, takeEvery, select, all } from 'redux-saga/effects';
import { Action } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import OneSignal from 'react-native-onesignal';

import * as Const from '@resources/users/constants';
import * as Actions from '@resources/users/actions';
import * as ActionsWebsocket from '@resources/websocket/actions';
import * as Request from '@resources/utils/request';
import * as Toast from '@resources/utils/toast';
import { User, USER_ROLE } from '@resources/users/_user';
import { Options } from '@resources/users/_options';
import { getPush } from '@resources/users/selectors';
import { setTimezone } from '@resources/utils/time';

// Отправка смс кода
export interface AuthSmsSendSuccess {
    wait_to_at: number;
}
function* authSmsSend(action: Action & Actions.AuthSendSmsFetch) {
    try {
        let res = yield call(Request.post, '/v2/users/sms_send', {
            phone: action.login,
        });
        let success: Action & AuthSmsSendSuccess = {
            type: Const.USERS_AUTH_SMS_SEND_SUCCESS,
            wait_to_at: res.content.wait_to_at,
        };
        yield put(success);

        Toast.showSuccess(res.msg);
    } catch (e) {
        yield put({ type: Const.USERS_AUTH_SMS_SEND_FAIL, e });
    }
}

// Вход
export interface AuthSuccess {
    user: User;
    access_token: string;
}
function* authPhone(action: Action & Actions.AuthPhoneFetch) {
    try {
        let res = yield call(Request.post, '/v2/users/phone_auth', {
            login: action.login,
            sms_code: action.sms_code,
        });

        let success: Action & AuthSuccess = {
            type: Const.USERS_AUTH_PHONE_SUCCESS,
            user: res.content.item,
            access_token: res.content.access_token,
        };
        yield _saveToken(success.access_token);
        yield _saveProfileID(success.user.id, success.user.role);

        yield put(success);

        yield _setTimezone(success.user);

        yield _setOneSignalData(success.user);
    } catch (e) {
        yield put({ type: Const.USERS_AUTH_PHONE_FAIL, e });
    }
}

// Вход
function* authLogin(action: Actions.AuthLoginFetch & Action) {
    try {
        let res = yield call(Request.post, '/v1/users/login', {
            email: action.email,
            password: action.password,
        });

        let success: Action & AuthSuccess = {
            type: Const.USERS_AUTH_LOGIN_SUCCESS,
            user: res.content.user,
            access_token: res.content.access_token,
        };
        yield _saveToken(success.access_token);
        yield _saveProfileID(success.user.id, success.user.role);

        yield put(success);

        yield _setTimezone(success.user);
        yield _setOneSignalData(success.user);
    } catch (e) {
        yield put({ type: Const.USERS_AUTH_LOGIN_FAIL, e });
    }
}

// Выход из аккаунта
function* authLogout() {
    try {
        AsyncStorage.removeItem('access_token');
        AsyncStorage.removeItem('profile_id');
        AsyncStorage.removeItem('profile_role');
        AsyncStorage.removeItem('push');

        yield put({ type: Const.USERS_AUTH_LOGOUT_SUCCESS });
        yield put(ActionsWebsocket.disconnect());

        OneSignal.setSubscription(false);
    } catch (e) {
        yield put({ type: Const.USERS_AUTH_LOGOUT_FAIL, e });
    }
}

// Профиль
export interface ProfileSuccess {
    user: User;
}
export function* _reqProfileGet() {
    let res = yield call(Request.get, '/v1/profile');
    let success: Action & ProfileSuccess = {
        type: Const.USERS_PROFILE_SUCCESS,
        user: res.content.user,
    };
    yield put(success);

    yield _setTimezone(success.user);
    yield _saveProfileID(success.user.id, success.user.role);
    yield _setOneSignalData(success.user);
}
function* profile() {
    try {
        yield call(_reqProfileGet);
    } catch (e) {
        yield put({ type: Const.USERS_PROFILE_FAIL, e });
    }
}

// Выход со всех устройств
function* revoke() {
    try {
        let res = yield call(Request.post, '/v1/auth/revoke');

        let success: Action = {
            type: Const.USERS_REVOKE_SUCCESS,
        };
        yield put(success);
        yield put(Actions.authLogout());

        Toast.showSuccess(res.msg);
    } catch (e) {
        yield put({ type: Const.USERS_REVOKE_FAIL, e });
    }
}

// Настройка
export interface OptionsSuccess {
    options: Options;
}
function* settings() {
    try {
        let res = yield call(Request.get, '/v2/options');

        let success: Action & OptionsSuccess = {
            options: res.content,
            type: Const.USERS_OPTIONS_SUCCESS,
        };
        yield put(success);
    } catch (e) {
        yield put({ type: Const.USERS_OPTIONS_FAIL, e });
    }
}

// Обновление профиля
export interface UserUpdateSuccess {
    user: User;
}
function* userUpdate(action: Action & Actions.UserUpdateFetch) {
    try {
        let res = yield call(Request.put, '/v2/users/' + action.user.id, {
            ...action.user,
        });

        let success: Action & UserUpdateSuccess = {
            type: Const.USERS_USER_UPDATE_SUCCESS,
            user: res.content.item,
        };
        yield put(success);

        yield _setTimezone(success.user);

        Toast.showSuccess(res.msg);
    } catch (e) {
        yield put({ type: Const.USERS_USER_UPDATE_FAIL, e });
    }
}

// Установка часового пояса
function* _setTimezone(user: User) {
    if (user.city_timezone) {
        setTimezone(user.city_timezone);
    }
}

// Сохранение токенов
export function* _saveToken(access_token: string) {
    try {
        yield AsyncStorage.setItem('access_token', access_token);
    } catch (e) {
        var err = new Request.RequestError('Ошибка при сохранении токенов');
        err.respStatus = Request.HTTP_STATUS.TOKEN_SAVE_ERR;
        throw err;
    }
}

// Установка тегов в OneSignal
function* _setOneSignalData(user: User) {
    let push: boolean = yield select(getPush);

    let tags: { [key: string]: any } = {
        user_id: user.id,
        role: user.role,
        supplier_id: user.supplier_id,
        city_id: user.city_id,
    };

    OneSignal.sendTags(tags);
    OneSignal.setSubscription(push);
}

// Сохранение ID профиля из хранилища
function* _saveProfileID(id: number, role: USER_ROLE) {
    try {
        yield AsyncStorage.setItem('profile_id', String(id));
        yield AsyncStorage.setItem('profile_role', role);
    } catch (e) {
        throw new Request.RequestError('Ошибка при сохранении ID профиля');
    }
}

// Восстановление локальных данных
function* _restoreLocalData() {
    try {
        let rawID = yield AsyncStorage.getItem('profile_id');
        let rawRole = yield AsyncStorage.getItem('profile_role');
        let rawPush = yield AsyncStorage.getItem('push');

        // PUSH включен по умолчанию
        if (!rawPush) {
            rawPush = '1';
        }

        let id = Number(rawID);
        let role = rawRole;
        let push = Boolean(Number(rawPush));

        yield put(
            Actions.localDataSet({
                profile_id: id ? id : 0,
                role: role ? role : USER_ROLE.CLIENT,
                push: push,
            }),
        );
        yield put(Actions.pushSet({ push }));
    } catch (e) {
        throw new Request.RequestError('Ошибка при восстановлении локальных данных');
    }
}

// Сохранение push настройки
function* pushSet(action: Action & Actions.PushSet) {
    try {
        OneSignal.setSubscription(action.push);
        yield AsyncStorage.setItem('push', action.push ? '1' : '0');
    } catch (e) {
        throw new Request.RequestError('Ошибка при сохранении push настройки');
    }
}


export function* apiUsers() {
    yield call(_restoreLocalData);

    yield takeEvery(Const.USERS_AUTH_SMS_SEND_FETCH, authSmsSend);
    yield takeEvery(Const.USERS_AUTH_PHONE_FETCH, authPhone);
    yield takeEvery(Const.USERS_AUTH_LOGIN_FETCH, authLogin);
    yield takeEvery(Const.USERS_AUTH_LOGOUT_FETCH, authLogout);
    yield takeEvery(Const.USERS_PROFILE_FETCH, profile);
    yield takeEvery(Const.USERS_REVOKE_FETCH, revoke);
    yield takeEvery(Const.USERS_OPTIONS_FETCH, settings);
    yield takeEvery(Const.USERS_PUSH_SET, pushSet);
    yield takeEvery(Const.USERS_USER_UPDATE_FETCH, userUpdate);

    yield all([put(Actions.options()), put(Actions.profile())]);
}
