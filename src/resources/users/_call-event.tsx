export enum CALL_STATUS {
    DISCONNECTED = 'disconnected',
    CONNECTED = 'connected',
    INCOMING = 'incoming',
    DIALING = 'dialing',
    OFFHOOK = 'offhook',
    MISSED = 'missed',
}

export interface CallEvent {
    phone: string;
    status: CALL_STATUS;
}

export const initialCallEvent: CallEvent = {
    phone: '',
    status: CALL_STATUS.INCOMING,
};
