import { State, initialState } from '@resources/drivers/_state';
import * as Const from '@resources/drivers/constants';
import * as ConstOrders from '@resources/orders/constants';
import * as Api from '@resources/drivers/api';
import * as ApiOrders from '@resources/orders/api';
import { updateArrayItem } from '@resources/utils';
import { initialDriver, Driver } from './_driver';

// Список приглашений
function invites(state: State, action: Api.InvitesSuccess): State {
    return {
        ...state,
        invites: action.invites,
    };
}

// Принять приглашение
function inviteAcceptSuccess(state: State, action: Api.InviteAcceptSuccess): State {
    return {
        ...state,
        invites: updateArrayItem(state.invites, action.invite.id, (invite) => {
            return {
                ...initialDriver,
                ...invite,
                ...action.invite,
            };
        }),
    };
}

function ordersSuccess(state: State, action: ApiOrders.OrdersSuccess): State {
    let invites: Driver[] = updateArrayItem(state.invites, action.driver.id, (driver) => {
        return {
            ...initialDriver,
            ...driver,
            ...action.driver,
        };
    });

    let isInvite = invites.find((i) => i.id == action.driver.id);

    if (!isInvite) {
        invites = [...invites, action.driver];
    }

    return {
        ...state,
        invites: action.driver.id ? invites : [],
    };
}

export const reducerDrivers = (state: State = initialState, action: any) => {
    switch (action.type) {
        case Const.DRIVERS_INVITES_SUCCESS:
            return invites(state, action);
        case Const.DRIVERS_INVITE_ACCEPT_SUCCESS:
            return inviteAcceptSuccess(state, action);

        case ConstOrders.ORDERS_ORDERS_SUCCESS:
            return ordersSuccess(state, action);

        default:
            return state;
    }
};
