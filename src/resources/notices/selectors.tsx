import { createSelector } from 'reselect';

import { GlobalState } from '@resources/reducers';
import { Notice } from '@resources/notices/_notice';

// Список уведомлений
export const getNotices = (state: GlobalState): Notice[] => state.notices.notices;
