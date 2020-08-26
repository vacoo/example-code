import * as Const from '@resources/areas/constants';
import { initialArea } from '@resources/areas/_area';
import { State, initialState } from '@resources/areas/_state';
import * as Api from '@resources/areas/api';
import { applyArrayDefault } from '@resources/utils';

// Список зон доставок
function areasSuccess(state: State, action: Api.AreasSuccess): State {
    return {
        ...state,
        areas: applyArrayDefault(action.areas, initialArea),
    };
}

// Применить выбранные зоны доставки
function areasApplySuccess(state: State, action: Api.AreasApplySuccess): State {
    return {
        ...state,
    };
}

export const reducerAreas = (state: State = initialState, action: any) => {
    switch (action.type) {
        case Const.AREAS_AREAS_SUCCESS:
            return areasSuccess(state, action);
        case Const.AREAS_AREAS_APPLY_SUCCESS:
            return areasApplySuccess(state, action);

        default:
            return state;
    }
};
