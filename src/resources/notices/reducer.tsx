import { Action } from 'redux';

import * as Const from '@resources/notices/constants';
import { State, initialState } from '@resources/notices/_state';
import * as Api from '@resources/notices/api';

// Список уведомлений
function notices(state: State, action: Action & Api.NoticesSuccess): State {
    return {
        ...state,
        notices: action.notices,
    };
}

export const reducerNotices = (state: State = initialState, action: any) => {
    switch (action.type) {
        case Const.NOTICES_NOTICES_SUCCESS:
            return notices(state, action);

        default:
            return state;
    }
};
