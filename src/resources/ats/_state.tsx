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
}

export const initialState: State = {
    status: { ...initialStatus },
};
