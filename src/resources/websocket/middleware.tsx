import { Middleware, MiddlewareAPI } from 'redux';

import { Action, Options } from '@resources/websocket/_types';
import { error } from '@resources/websocket/actions';
import * as Const from '@resources/websocket/constants';
import { ReduxWebSocket } from '@resources/websocket/redux-websocket';

/**
 * Default middleware creator options.
 * @private
 */
const defaultOptions = {
    reconnectInterval: 2000,
    reconnectOnClose: true,
    prefix: Const.DEFAULT_PREFIX,
    serializer: JSON.stringify,
};

/**
 * Create a middleware.
 *
 * @param {Options} rawOptions
 *
 * @returns {Middleware}
 */
export const createWebsocketMiddleware = (rawOptions?: Options): Middleware => {
    const options = { ...defaultOptions, ...rawOptions };
    const { prefix } = options;
    const actionPrefixExp = RegExp(`^${prefix}::`);

    // Create a new redux websocket instance.
    const reduxWebsocket = new ReduxWebSocket(options);

    // Define the list of handlers, now that we have an instance of ReduxWebSocket.
    const handlers = {
        [Const.WEBSOCKET_CONNECT]: reduxWebsocket.connect,
        [Const.WEBSOCKET_DISCONNECT]: reduxWebsocket.disconnect,
        [Const.WEBSOCKET_SEND]: reduxWebsocket.send,
    };

    // Middleware function.
    return (store: MiddlewareAPI) => (next) => (action: Action) => {
        const { dispatch } = store;
        const { type: actionType } = action;

        // Check if action type matches prefix
        if (actionType && actionType.match(actionPrefixExp)) {
            const baseActionType = action.type.replace(actionPrefixExp, '');
            const handler = Reflect.get(handlers, baseActionType);

            if (handler) {
                try {
                    handler(store, action);
                } catch (err) {
                    dispatch(error(action, err, prefix));
                }
            }
        }

        return next(action);
    };
};
