import { createSelector } from 'reselect';

import { Driver, initialDriver } from '@resources/drivers/_driver';
import { GlobalState } from '@resources/reducers';

// Приглашения
export const getInvites = (state: GlobalState): Driver[] => state.drivers.invites;

// Водитель
export const getDriver = (state: GlobalState): Driver => {
    let driver = state.drivers.invites.find((i) => i.user_id === state.users.profile.id && i.accept);
    return driver ? driver : { ...initialDriver };
};

// Привязан ли текущий водитель к службе
export const getIsDriverAccept = (state: GlobalState): boolean => getDriver(state).accept

// Количество выбранных районов водителя
export const getDriverAreasCount = (state: GlobalState): number => {
    let driver = state.drivers.invites.find((i) => i.user_id === state.users.profile.id);
    return driver ? driver.areas.length : 0;
};
