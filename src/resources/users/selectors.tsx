import { createSelector } from 'reselect';

import { User, USER_ROLE } from '@resources/users/_user';
import { GlobalState } from '@resources/reducers';
import { Options } from '@resources/users/_options';
import { LOGIN_TYPE } from '@resources/users/_state';

// Профиль
export const getProfile = (state: GlobalState): User => state.users.profile;

// Количество непрочитанных сообщений
export const getUnreadedCount = (state: GlobalState): number => state.users.profile.unreaded_count;

// ID профиля
export const getProfileID = (state: GlobalState): number => state.users.profile.id;

// Роль профиля
export const getProfileRole = (state: GlobalState): USER_ROLE => state.users.profile.role;

// Авторизован
export const getIsAuth = (state: GlobalState): boolean => state.users.isAuth;

// Ждать смс до
export const getWaitToAt = (state: GlobalState): number => state.users.waitToAt;

// Логин
export const getLogin = (state: GlobalState): string => state.users.login;

// Смс код отправлен
export const getIsSmsCodeSended = (state: GlobalState): boolean => state.users.isSmsCodeSended;

// Настройки
export const getOptions = (state: GlobalState): Options => state.users.options;

// Имя профиля
export const getProfileName = (state: GlobalState): string => state.users.profile.name;
