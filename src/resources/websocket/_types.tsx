import { HOST_WS, SSL } from 'react-native-dotenv';

import * as Const from '@resources/websocket/constants';

export type Serializer = (payload: any) => string | ArrayBuffer | ArrayBufferView | Blob;

export type ActionType =
    | typeof Const.WEBSOCKET_CLOSED
    | typeof Const.WEBSOCKET_CONNECT
    | typeof Const.WEBSOCKET_DISCONNECT
    | typeof Const.WEBSOCKET_MESSAGE
    | typeof Const.WEBSOCKET_OPEN
    | typeof Const.WEBSOCKET_SEND;

export type Action =
    | { type: typeof Const.WEBSOCKET_CLOSED; payload: any }
    | { type: typeof Const.WEBSOCKET_CONNECT; payload: any }
    | { type: typeof Const.WEBSOCKET_DISCONNECT; payload: any }
    | { type: typeof Const.WEBSOCKET_MESSAGE; payload: any }
    | { type: typeof Const.WEBSOCKET_OPEN; payload: any }
    | { type: typeof Const.WEBSOCKET_SEND; payload: any };

export type Options = {
    prefix?: string;
    reconnectInterval?: number;
    reconnectOnClose?: boolean;
    onOpen?: (s: WebSocket) => void;
    serializer?: Serializer;
};

export const getWebsocketURL = (): string => {
    return (Boolean(Number(SSL)) ? 'wss://' : 'ws://') + HOST_WS;
};
