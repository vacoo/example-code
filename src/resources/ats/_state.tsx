import { EventCall, initialEventCall, CALL_STATUS } from '@resources/ats/_event-call';

export interface Status {
    isEnabled: boolean;
    isWiFi: boolean;
    isPermissions: boolean;
}

export const initialStatus = {
    isEnabled: false,
    isWiFi: false,
    isPermissions: false,
};

export interface State {
    status: Status;
    calls: EventCall[];
}

export const initialState: State = {
    status: { ...initialStatus },
    calls: [],
};
