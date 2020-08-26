import { State, initialState } from '@resources/users/_state';
import * as Const from '@resources/users/constants';
import * as Api from '@resources/users/api';
import * as Actions from '@resources/users/actions';
import { initialUser } from '@resources/users/_user';
import { initialOptions } from '@resources/users/_options';

// Отправка смс кода
function authSmsSendFetch(state: State, action: Actions.AuthSendSmsFetch): State {
    return {
        ...state,
        login: action.login,
    };
}

// Успешная отправка смс кода
function authSmsSendSuccess(state: State, action: Api.AuthSmsSendSuccess): State {
    return {
        ...state,
        waitToAt: action.wait_to_at,
        isSmsCodeSended: true,
    };
}

// Вход по номеру телефона
function authSuccess(state: State, action: Api.AuthSuccess): State {
    return {
        ...state,
        profile: action.user,
        isAuth: true,
    };
}

// Выход из аккаунта
function authLogoutSuccess(state: State): State {
    return {
        ...state,
        profile: { ...initialUser },
        isAuth: false,
        isSmsCodeSended: false,
    };
}

// Профиль
function profileSuccess(state: State, action: Api.ProfileSuccess): State {
    return {
        ...state,
        profile: action.user,
        isAuth: true,
    };
}

// Настройки
function optionsSuccess(state: State, action: Api.OptionsSuccess): State {
    return {
        ...state,
        options: {
            ...initialOptions,
            ...action.options,
        },
    };
}

// Восстановление ID профиля из хранилища
function localDataSet(state: State, action: Actions.LocalDataSet): State {
    return {
        ...state,
        push: action.push,
        profile: {
            ...state.profile,
            id: action.profile_id,
            role: action.role,
        },
    };
}

// Изменить тип входа
function loginTypeSet(state: State, action: Actions.LoginTypeSet): State {
    return {
        ...state,
        loginType: action.loginType,
    };
}

// Сохранение push настройки
function pushSet(state: State, action: Actions.PushSet): State {
    return {
        ...state,
        push: action.push,
    };
}

// Прочитать все
function noticesReaded(state: State): State {
    return {
        ...state,
        profile: {
            ...state.profile,
            unreaded_count: 0,
        },
    };
}

// Обновление профиля
function userUpdate(state: State, action: Api.UserUpdateSuccess): State {
    return {
        ...state,
        profile: {
            ...initialUser,
            ...state.profile,
            ...action.user,
        },
    };
}

export const reducerUsers = (state: State = initialState, action: any) => {
    switch (action.type) {
        case Const.USERS_AUTH_SMS_SEND_FETCH:
            return authSmsSendFetch(state, action);
        case Const.USERS_AUTH_SMS_SEND_SUCCESS:
            return authSmsSendSuccess(state, action);

        case Const.USERS_AUTH_PHONE_SUCCESS:
        case Const.USERS_AUTH_LOGIN_SUCCESS:
            return authSuccess(state, action);
        case Const.USERS_AUTH_LOGOUT_SUCCESS:
            return authLogoutSuccess(state);
        case Const.USERS_PROFILE_SUCCESS:
            return profileSuccess(state, action);

        case Const.USERS_OPTIONS_SUCCESS:
            return optionsSuccess(state, action);

        case Const.USERS_LOCAL_DATA_SET:
            return localDataSet(state, action);

        case Const.USERS_LOGIN_TYPE_SET:
            return loginTypeSet(state, action);

        case Const.USERS_PUSH_SET:
            return pushSet(state, action);

        case Const.USERS_USER_UPDATE_SUCCESS:
            return userUpdate(state, action);

        default:
            return state;
    }
};
