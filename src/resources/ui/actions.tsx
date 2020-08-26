import { Action } from 'redux';
import * as Const from '@resources/ui/constants';
import { MenuContextItem } from '@resources/ui/_menu-item';

// Открыть меню
export interface MenuContextOpen {
    menuContext: MenuContextItem[];
}
export function menuContextOpen(playload: MenuContextOpen): Action & MenuContextOpen {
    return {
        type: Const.UI_MENU_CONTEXT_OPEN,
        ...playload,
    };
}

// Закрыть меню
export function menuContextClose(): Action {
    return {
        type: Const.UI_MENU_CONTEXT_CLOSE,
    };
}
