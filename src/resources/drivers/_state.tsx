import { Driver } from '@resources/drivers/_driver';

export interface State {
    invites: Driver[];
}

export const initialState: State = {
    invites: [],
};
