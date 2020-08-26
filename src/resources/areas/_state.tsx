import { Area } from '@resources/areas/_area';

export interface State {
    areas: Array<Area>;
}

export const initialState: State = {
    areas: [],
};
