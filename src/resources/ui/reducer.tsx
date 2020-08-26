import { State, initialState } from '@resources/ui/_state';

const P_FETCH = /FETCH/g;
const P_SUCCESS = /SUCCESS/g;
const P_FAIL = /FAIL/g;

export function loading(state: State, namespace: string, name: string, loading: boolean): State {
    let stateLoad: { [key: string]: any } = state.req;
    return {
        ...state,
        req: {
            ...state.req,
            [namespace]: {
                ...stateLoad[namespace],
                [name]: loading,
            },
        },
    };
}

function getNamespace(action: string): string {
    let parts = action.split('_');
    return parts[0].toLowerCase();
}

function getName(action: string): string {
    let parts = action.split('_');
    if (parts.length >= 2) {
        return parts
            .slice(1, parts.length - 1)
            .join('_')
            .toLowerCase();
    }
    return '';
}

export const reducerUI = (state: State = initialState, action: any): State => {
    const { type } = action;

    if (type.match(P_FETCH)) {
        return loading(state, getNamespace(type), getName(type), true);
    }
    if (type.match(P_SUCCESS) || type.match(P_FAIL)) {
        return loading(state, getNamespace(type), getName(type), false);
    }

    return state;
};
