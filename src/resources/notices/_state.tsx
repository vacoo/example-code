import { Notice } from '@resources/notices/_notice';

export interface State {
    notices: Notice[];
}

export const initialState: State = {
    notices: [],
};
