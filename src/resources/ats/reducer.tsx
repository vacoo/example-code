import { State, initialState } from '@resources/ats/_state';
import * as Const from '@resources/ats/constants';
import * as Actions from '@resources/ats/actions';

// Включить/выключить
function toogle(state: State, action: Actions.Toogle): State {
    return {
        ...state,
        status: {
            ...state.status,
            isEnabled: action.enable,
        },
    };
}

// Установить состояние
function statusSet(state: State, action: Actions.StatusSet): State {
    return {
        ...state,
        status: {
            ...state.status,
            ...action.status,
        },
    };
}

export const reducerAts = (state: State = initialState, action: any) => {
    switch (action.type) {
        case Const.ATS_TOOGLE:
            return toogle(state, action);
        case Const.ATS_STATUS_SET:
            return statusSet(state, action);
        default:
            return state;
    }
};
