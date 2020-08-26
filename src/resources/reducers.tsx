import { combineReducers } from 'redux';

import { reducerUI } from '@resources/ui/reducer';
import { reducerUsers } from '@resources/users/reducer';
import { reducerAts } from '@resources/ats/reducer';

import { State as UI } from '@resources/ui/_state';
import { State as Users } from '@resources/users/_state';
import { State as Ats } from '@resources/ats/_state';

export type GlobalState = {
    ui: UI;
    users: Users;
    ats: Ats;
};

export const reducers = combineReducers({
    ui: reducerUI,
    users: reducerUsers,
    ats: reducerAts,
});
