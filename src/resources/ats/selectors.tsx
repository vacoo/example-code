import { GlobalState } from '@resources/reducers';

export const getStatus = (state: GlobalState) => state.ats.status;
