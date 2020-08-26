import AsyncStorage from '@react-native-community/async-storage';
import { HOST_API, SSL } from 'react-native-dotenv';
const Package = require('@root/package.json');

export function getProtocol() { 
    return Boolean(Number(SSL)) ? 'https://' : 'http://';
}
 
export function getStorage() {
    return getProtocol() + HOST_API + '/storage/';
}

export interface Options { 
    method: string;
    query: any;
    body?: any;
    headers?: any;
    multipart?: boolean;
}

export enum HTTP_STATUS {
    OK = 200,
    NOT_FOUND = 400,
    UNAUTH = 401,
    TOKEN_SAVE_ERR = 10,
}

// Преобразует объект в URL query
export function buildQuery(object: any) {
    let params: Array<string> = [];
    for (let key in object) {
        params.push(key + '=' + object[key]);
    }
    return params.length !== 0 ? '?' + params.join('&') : '';
}

export class RequestError extends Error {
    respStatus: number = 0;
}

export function serialize(body: any) {
    var formBody = [];
    for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}

// Request
export async function request(path: string, options: Options) {
    let url = getProtocol() + HOST_API + path + buildQuery(options.query);

    const accessToken = await AsyncStorage.getItem('access_token');

    let headers: any = {
        Accept: 'application/json',
        Authorization: accessToken,
        'Accept-Encoding': 'gzip, deflate',
        app: "vodopad_drive",
        version: Package.version,
    };

    if (!options.multipart) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    let data: any = {
        method: options.method,
        headers: headers,
    };

    if (options.body && !options.multipart) {
        data['body'] = serialize(options.body);
    }

    if (options.multipart) {
        data['body'] = options.body;
    }

    return fetch(url, data)
        .then(async (response: any) => {
            if (response.status === HTTP_STATUS.OK) {
                let json = await response.json();
                return json;
            } else {
                try {
                    let json = await response.json();
                    let error = new RequestError(json.msg);
                    error.respStatus = response.status;
                    return Promise.reject(error);
                } catch (e) {
                    let error = new RequestError(response.statusText);
                    error.respStatus = response.status;
                    return Promise.reject(error);
                }
            }
        })
        .then(responseJson => {
            return Promise.resolve(responseJson);
        })
        .catch(error => {
            error.message = t(error.message);
            return Promise.reject(error);
        });
}

// Создание
export function post(path: string, body: any = {}, query: any = {}) {
    return request(path, { method: 'POST', query: query, body: body });
}

// Получение
export function get(path: string, query: any = {}) {
    return request(path, { method: 'GET', query: query });
}

// Обновление
export function put(path: string, body: any = {}, query: any = {}) {
    return request(path, { method: 'PUT', query: query, body: body });
}

// Удаление
export function remove(path: string, query: any = {}) {
    return request(path, { method: 'DELETE', query: query, body: {} });
}

// Перевод ошибок
function t(str: string) {
    str = str.toLowerCase();
    if (str === 'network request failed') {
        return 'Ошибка подключения к сети';
    }
    return str;
}
