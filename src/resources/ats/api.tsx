import { takeEvery, select, put, delay, call, take } from 'redux-saga/effects';
import { Action } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundService from 'react-native-background-actions';
import RNCallDetection from 'react-native-call-detection';
import { PermissionsAndroid, BackHandler, Alert, Platform } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import { eventChannel, END } from 'redux-saga';

import * as Const from '@resources/ats/constants';
import * as Actions from '@resources/ats/actions';
import { getStatus } from '@resources/ats/selectors';
import { Status } from '@resources/ats/_state';
import { EventCall, CALL_STATUS, initialEventCall } from '@resources/ats/_event-call';
import { USER_ROLE } from '@resources/users/_user';
import * as Toast from '@resources/utils/toast';

// Включить/выключить
function* toogle(action: Action & Actions.Toogle) {
    let status: Status = yield select(getStatus);

    if (action.enable) {
        yield delay(1000);
        yield put(
            Actions.statusSet({
                status: {
                    ...status,
                    isEnabled: true,
                    isWiFi: true,
                    isPermissions: true,
                },
            }),
        );
    }

    yield AsyncStorage.setItem('enable', String(action.enable ? 1 : 0));
}

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
    } catch (e) {
        console.error(e);
    }
}

async function veryIntensiveTask({ delay }: { delay: number }) {
    await new Promise((resolve) => {
        console.log(delay);
        // for (let i = 0; BackgroundService.isRunning(); i++) {
        //     console.log(i);
        // }
    });
}

// Обработка события звонка
export function* callEvent() {
    const channel = eventChannel((emit: any) => {
        new RNCallDetection(
            (rawStatus: string, phone: string) => {
                const status = rawStatus.toLocaleLowerCase() as CALL_STATUS;
                let eventCall: EventCall = {
                    ...initialEventCall,
                    status: status,
                    phone: phone,
                };
            },
            true,
            () => {},
            {
                title: 'Разрешение доступ к состоянию телефона',
                message:
                    'Приложение нуждается в доступе к состоянию вашего телефона для передачи номера входящего звонка в CRM',
            },
        );
        return () => {};
    });

    while (true) {
        const action = yield take(channel);
        const isAts = yield AsyncStorage.getItem('ats');
        if (isAts) {
            yield put(action);
        }
    }
}

// Запрос разрешений и запуск телефонии
function* _ats() {
    try {
        if (Platform.OS === 'android') {
            KeepAwake.activate(); // Держим экран включенным

            const role: USER_ROLE = yield AsyncStorage.getItem('profile_role');
            const isAts = yield AsyncStorage.getItem('ats');

            if (isAts && role === USER_ROLE.MANAGER) {
                yield PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
                yield PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CALL_LOG);
                yield call(callEvent);
            }
        }
    } catch (e) {
        Toast.showError(e.message);
    }
}

// Включить телефонию
function* atsEnable() {
    if (Platform.OS === 'android') {
        yield AsyncStorage.setItem('ats', '1');
        yield _ats();
    }
}

// Выключить телефонию
function* atsDisable() {
    yield AsyncStorage.removeItem('ats');
}

function* init() {
    yield BackgroundService.stop();
    yield BackgroundService.start(veryIntensiveTask, {
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

function* eventCallSend() {
    Toast.showSuccess("Событие отправлено")
}

export function* apiAts() {
    yield call(restore);

    yield takeEvery(Const.ATS_TOOGLE, toogle);
    yield takeEvery(Const.ATS_EVENT_CALL_SEND, eventCallSend)
}
