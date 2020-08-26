import { Action } from 'redux';
import * as Const from '@resources/areas/constants';
import { Area } from '@resources/areas/_area';

// Список зон доставок
export function areas(): Action {
    return {
        type: Const.AREAS_AREAS_FETCH,
    };
}

// Применить выбранные зоны доставки
export interface AreasApplyFetch {
    driverID: number;
    areas: Array<Area>;
    selectedAreas: Array<number>;
}
export function areasApply(playload: AreasApplyFetch): Action & AreasApplyFetch {
    return {
        type: Const.AREAS_AREAS_APPLY_FETCH,
        ...playload,
    };
}
