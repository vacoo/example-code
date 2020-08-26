import { createStore, applyMiddleware, compose, Action } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { reducers } from '@resources/reducers';
import { middlewareToastFail } from '@resources/ui/middleware-toast-fail';

import { apiUsers } from '@resources/users/api';
import { apiSuppliers } from '@resources/suppliers/api';
import { apiDrivers } from '@resources/drivers/api';
import { apiBilling } from '@resources/billing/api';
import { apiReports } from '@resources/reports/api';
import { apiOrders } from '@resources/orders/api';
import { apiNotices } from '@resources/notices/api';
import { apiAreas } from '@resources/areas/api';
import { createWebsocketMiddleware } from '@resources/websocket/middleware';

const ACTIONS_DISABLED: Array<string> = [];

export function Store() {
    const loggerMiddleware = createLogger({
        // Отключенные действия
        predicate: (getState, action: Action) => ACTIONS_DISABLED.indexOf(action.type) === -1,
    });
    const sagaMiddleware = createSagaMiddleware();
    const websocketMiddleware = createWebsocketMiddleware();

    let middlewares = null;

    if (__DEV__) {
        middlewares = applyMiddleware(middlewareToastFail, sagaMiddleware, websocketMiddleware, loggerMiddleware);
    } else {
        middlewares = applyMiddleware(middlewareToastFail, sagaMiddleware, websocketMiddleware);
    }

    let store = createStore(reducers, compose(middlewares));

    sagaMiddleware.run(apiUsers);
    sagaMiddleware.run(apiSuppliers);
    sagaMiddleware.run(apiDrivers);
    sagaMiddleware.run(apiBilling);
    sagaMiddleware.run(apiReports);
    sagaMiddleware.run(apiOrders);
    sagaMiddleware.run(apiNotices);
    sagaMiddleware.run(apiAreas);

    return store;
}
