import { Operation } from '@resources/billing/_operation';

export interface State {
    operations: Array<Operation>;
}

export const initialState: State = {
    operations: [],
};
