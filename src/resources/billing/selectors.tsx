import { createSelector } from 'reselect';

import { GlobalState } from '@resources/reducers';
import { Operation } from '@resources/billing/_operation';

// Список операций
export const getOperations = (state: GlobalState): Operation[] => state.billing.operations;
