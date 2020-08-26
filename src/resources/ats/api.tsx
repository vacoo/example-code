import { takeEvery, select, put, delay, call, take, fork } from 'redux-saga/effects';
import { Action } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundService from 'react-native-background-actions';
import RNCallDetection from 'react-native-call-detection';
import { PermissionsAndroid, Alert } from 'react-native';
import { eventChannel } from 'redux-saga';
import NetInfo from '@react-native-community/netinfo';

import * as Request from '@resources/utils/request';
import * as Const from '@resources/ats/constants';
import * as Actions from '@resources/ats/actions';
import { getStatus } from '@resources/ats/selectors';
import { Status } from '@resources/ats/_state';
import { CALL_STATUS } from '@resources/ats/_event-call';
import * as Toast from '@resources/utils/toast';

// Включить/выключить
function* toogle(action: Action & Actions.Toogle) {
    let status: Status = yield select(getStatus);

    if (action.enable) {
        if (!status.isPermissions) {
            Alert.alert('Статус', 'Предоставьте разрашения на чтение телефонных вызовов');

            yield put(
                Actions.statusSet({
                    status: {
                        ...status,
                        isEnabled: false,
                    },
                }),
            );
        } else if (!status.isWiFi) {
            Alert.alert('Статус', 'Подключитесь к WI-FI точке');
            yield put(
                Actions.statusSet({
                    status: {
                        ...status,
                        isEnabled: false,
                    },
                }),
            );
        } else {
            yield start();
        }
    } else {
        yield BackgroundService.stop();
    }

    yield AsyncStorage.setItem('enable', String(action.enable ? 1 : 0));
}

// Восстановление состояния
function* restore() {
    try {
        let status: Status = yield select(getStatus);
        let raw = yield AsyncStorage.getItem('enable');
        let enable: boolean = raw ? Boolean(Number(raw)) : false;

        yield put(
            Actions.statusSet({
                status: {
                    ...status,
                    isEnabled: enable,
                },
            }),
        );

        if (enable) {
            yield start();
        }
    } catch (e) {
        console.error(e);
    }
}

const PERM_TITLE = 'Разрешение доступ к состоянию телефона';
const PERM_MESSAGE =
    'Приложение нуждается в доступе к состоянию вашего телефона для передачи номера входящего звонка в CRM';

// Слушатель событий звонка
async function listen() {
    await new Promise(() => {
        new RNCallDetection(
            (rawStatus: string, phone: string) => {
                if (BackgroundService.isRunning()) {
                    // Отправка события
                    const status = rawStatus.toLocaleLowerCase() as CALL_STATUS;
                    Request.post('/v1/event-call', {
                        status: status,
                        phone: phone,
                    })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                }
            },
            true,
            () => {},
            {
                title: PERM_TITLE,
                message: PERM_MESSAGE,
            },
        );
    });
}

function* start() {
    yield BackgroundService.stop();
    yield BackgroundService.start(listen, {
        taskName: 'call',
        taskTitle: 'Телефония включена',
        taskDesc: 'Передача событий звонков в Vodopad CRM',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#206FE5',
        parameters: {
            delay: 1000,
        },
    });
}

// Проверка WIFI подключения
function* checkWiFi() {
    const channel = eventChannel((emit: any) => {
        NetInfo.addEventListener((state) => {
            emit(state.isConnected);
        });
        return () => {};
    });

    while (true) {
        let connected: boolean = yield take(channel);
        let status: Status = yield select(getStatus);

        yield put(
            Actions.statusSet({
                status: {
                    ...status,
                    isWiFi: connected,
                },
            }),
        );
    }
}

// Проверка разрешений
function* checkPermissions() {
    while (true) {
        let readPhoneState: boolean = yield PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
        let readCallLog: boolean = yield PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CALL_LOG);

        let status: Status = yield select(getStatus);

        yield put(
            Actions.statusSet({
                status: {
                    ...status,
                    isPermissions: readPhoneState && readCallLog,
                },
            }),
        );

        yield delay(5000);
    }
}

// Запрос разрешений
function* permissionsRequest() {
    yield PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
    yield PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CALL_LOG);

    yield checkPermissions();
}

// Отправка события звонка
function* eventCallSend(action: Action) {
    try {
        const phone = '+79141111111';

        yield call(Request.post, '/v1/event-call', {
            status: CALL_STATUS.INCOMING,
            phone: phone,
        });

        Toast.showInfo('Событие отправлено', 'Сейчас через 3 сек откроется карточка');
        yield delay(1000);

        let res = yield call(Request.post, '/v1/event-call', {
            status: CALL_STATUS.OFFHOOK,
            phone: phone,
        });

        Toast.showSuccess('Ответ от сервера', res.msg);
    } catch (e) {
        Toast.showError('Не удалось отправить событие', e.message);
    }
}

export function* apiAts() {
    yield call(restore);
    yield fork(checkWiFi);
    yield fork(checkPermissions);

    yield takeEvery(Const.ATS_TOOGLE, toogle);
    yield takeEvery(Const.ATS_EVENT_CALL_TEST_SEND, eventCallSend);
    yield takeEvery(Const.ATS_PERMISSIONS_REQUEST, permissionsRequest);
}
