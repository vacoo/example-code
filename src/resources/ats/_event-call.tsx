export enum CALL_STATUS {
    DISCONNECTED = 'disconnected',
    CONNECTED = 'connected',
    INCOMING = 'incoming',
    DIALING = 'dialing',
    OFFHOOK = 'offhook',
    MISSED = 'missed',
}

export const CALL_STATUS_LABEL = {
    [CALL_STATUS.DISCONNECTED]: 'Вызов завершен',
    [CALL_STATUS.CONNECTED]: 'Подключен',
    [CALL_STATUS.INCOMING]: 'Входящий вызов',
    [CALL_STATUS.DIALING]: 'Набор номера',
    [CALL_STATUS.OFFHOOK]: 'Принятие вызова',
    [CALL_STATUS.MISSED]: 'Звонок отклонен',
};

export interface EventCall {
    phone: string;
    status: CALL_STATUS;
}

export const initialEventCall: EventCall = {
    phone: '',
    status: CALL_STATUS.INCOMING,
};
