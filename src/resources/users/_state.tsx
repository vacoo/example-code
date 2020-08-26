import { User, initialUser, USER_ROLE } from '@resources/users/_user';
import { Options, initialOptions } from '@resources/users/_options';

export enum LOGIN_TYPE {
    PHONE = 'phone',
    EMAIL = 'email',
}

export interface State {
    profile: User;
    options: Options;

    login: string; // Логин
    waitToAt: number; // Время до разблокироваки отправки смс кода
    isAuth: boolean; // Авторизован
    isSmsCodeSended: boolean; // Смс код успешно отправлен
}

export const initialState: State = {
    profile: { ...initialUser, id: 1, role: USER_ROLE.DRIVER },
    options: { ...initialOptions },

    login: '',
    waitToAt: 0,
    isAuth: false,
    isSmsCodeSended: false,
};
