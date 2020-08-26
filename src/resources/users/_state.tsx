import { User, initialUser, USER_ROLE } from '@resources/users/_user';
import { Options, initialOptions } from '@resources/users/_options';

export enum LOGIN_TYPE {
    PHONE = 'phone',
    EMAIL = 'email',
}

export interface State {
    profile: User;
    push: boolean;
    options: Options;
    loginType: LOGIN_TYPE;

    login: string; // Логин
    waitToAt: number; // Время до разблокироваки отправки смс кода
    isAuth: boolean; // Авторизован
    isSmsCodeSended: boolean; // Смс код успешно отправлен
}

export const initialState: State = {
    profile: { ...initialUser, id: 1, role: USER_ROLE.DRIVER },
    push: true,
    options: { ...initialOptions },
    loginType: LOGIN_TYPE.EMAIL,

    login: '',
    waitToAt: 0,
    isAuth: false,
    isSmsCodeSended: false,
};
