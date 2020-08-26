import * as Const from '@resources/websocket/constants';
import { Action } from '@resources/websocket/_types';

type WithProtocols = [string[]] | [string[], string];
type WithPrefix = [string];
type ConnectRestArgs = [] | WithPrefix | WithProtocols;

type BuiltAction<T> = {
    type: string;
    meta: {
        timestamp: Date;
    };
    payload?: T;
};

// Определяет содержат ли остальные аргументы для подключения протоколы или нет.
const isProtocols = (args: ConnectRestArgs): args is WithProtocols => Array.isArray(args[0]);

// Действие совместимое с FSA
function buildAction<T>(actionType: string, payload?: T, meta?: any): BuiltAction<T> {
    const base = {
        type: actionType,
        meta: {
            timestamp: new Date(),
            ...meta,
        },
        // Смешайте ключ "ошибка", если полезная нагрузка является ошибкой.
        ...(payload instanceof Error ? { error: true } : null),
    };

    return payload ? { ...base, payload } : base;
}

// Action creators for user dispatched actions. These actions are all optionally
// prefixed.
export const connect = (url: string, ...args: ConnectRestArgs) => {
    let prefix: string | undefined;
    let protocols: string[] | undefined;

    // If there's only one argument, check if it's protocols or a prefix.
    if (args.length === 1) {
        [protocols, prefix] = isProtocols(args) ? args : [undefined, args[0]];
    }

    // If there are two arguments after `url`, assume it's protocols and prefix.
    if (args.length === 2) {
        [protocols, prefix] = args;
    }

    return buildAction(`${prefix || Const.DEFAULT_PREFIX}::${Const.WEBSOCKET_CONNECT}`, {
        url,
        protocols,
    });
};

// Разъеденение
export const disconnect = (prefix?: string) =>
    buildAction(`${prefix || Const.DEFAULT_PREFIX}::${Const.WEBSOCKET_DISCONNECT}`);

// Отправка
export function send<T>(msg: T, prefix?: string) {
    return buildAction(`${prefix || Const.DEFAULT_PREFIX}::${Const.WEBSOCKET_SEND}`, msg);
}

// Action creators for actions dispatched by redux-websocket. All of these must
// take a prefix. The default prefix should be used unless a user has created
// this middleware with the prefix option set.
export const beginReconnect = (prefix: string) => buildAction(`${prefix}::${Const.WEBSOCKET_BEGIN_RECONNECT}`);

// Попытка переподключения
export const reconnectAttempt = (count: number, prefix: string) => {
    return buildAction(`${prefix}::${Const.WEBSOCKET_RECONNECT_ATTEMPT}`, { count });
};

// Переподключится
export const reconnected = (prefix: string) => buildAction(`${prefix}::${Const.WEBSOCKET_RECONNECTED}`);

// Открыть
export const open = (event: Event, prefix: string) => buildAction(`${prefix}::${Const.WEBSOCKET_OPEN}`, event);

// Сломанный
export const broken = (prefix: string) => buildAction(`${prefix}::${Const.WEBSOCKET_BROKEN}`);

// Закрыт
export const closed = (event: Event, prefix: string) => buildAction(`${prefix}::${Const.WEBSOCKET_CLOSED}`, event);

// Сообщение
export const message = (event: any, prefix: string) => {
    return buildAction(`${prefix}::${Const.WEBSOCKET_MESSAGE}`, {
        event,
        message: event.data,
        origin: event.origin,
    });
};

// Ошибка
export const error = (originalAction: Action | null, err: Error, prefix: string) => {
    return buildAction(`${prefix}::${Const.WEBSOCKET_ERROR}`, err, {
        message: err.message,
        name: err.name,
        originalAction,
    });
};
