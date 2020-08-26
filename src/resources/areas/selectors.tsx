import { createSelector } from 'reselect';

import { GlobalState } from '@resources/reducers';
import { Area } from '@resources/areas/_area';

// Список зон доставок
export const getAreas = (state: GlobalState): Area[] => state.areas.areas;