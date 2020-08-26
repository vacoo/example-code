import { UsersReq, initialUsersReq } from '@resources/ui/_req';

// Группа состояний загрузки
export interface StateReq {
    users: UsersReq;
}
export const initialStateReq: StateReq = {
    users: { ...initialUsersReq },
};

// Состояние UI
export interface State {
    req: StateReq;
}
export const initialState: State = {
    req: {
        ...initialStateReq,
    },
};
