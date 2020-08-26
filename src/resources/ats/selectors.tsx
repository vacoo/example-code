import { GlobalState } from '@resources/reducers';

export const getStatus = (state: GlobalState) => state.ats.status;
export const getCalls = (state: GlobalState) => state.ats.calls.reverse().slice(0, 5);
