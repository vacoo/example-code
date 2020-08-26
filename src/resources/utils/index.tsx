import { Platform, Linking } from 'react-native';
import { Image } from 'react-native-image-crop-picker';
const packageJSON = require('@root/package.json');

// Меняет состояние загрузки
export function loading<T>(
    state: T & { fetch: { [key: string]: boolean } },
    loadingStateName: string,
    fetch: boolean,
): T {
    return {
        ...state,
        fetch: {
            ...state.fetch,
            [loadingStateName]: fetch,
        },
    };
}

// Обновление объекта
export function updateObject(oldObject: object, newObject: object) {
    return {
        ...oldObject,
        newObject,
    };
}

// Обновление элемента массива по id
export function updateArrayItem<T>(
    array: Array<T & { id: number }>,
    id: number,
    updateItemCallback: (item: T & { id: number }) => any,
): Array<any> {
    const updatedItems = array.map((item, index) => {
        if (item.id !== id) {
            return item;
        }
        const updatedItem = updateItemCallback(item);
        return updatedItem;
    });

    return updatedItems;
}

// Применить к объекту массива значения по умолчанию
export function applyArrayDefault<T>(array: Array<T>, defaultItem: any): Array<T> {
    return array.map((item, index) => {
        return {
            ...defaultItem,
            ...item,
        };
    });
}

// Удаление из массива по id
export function deleteItemInArray(array: Array<any>, itemId: number) {
    return array.filter((item, index) => item.id !== itemId);
}

// Генерирует случайный ID
export function tempId() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
}

// Уничтожает неизвестные значения у переменных
export function undefDestroy(object: any) {
    for (let key in object) {
        if (object[key] === undefined) {
            delete object[key];
        }
    }
    return object;
}

// Принимает текст (с новыми строчками) и возвращает массив строк
export function splitNewLine(text: string): Array<string> {
    let labeledText = text.replace(/(?:\\r\\n|\\r|\\n)/g, ';');
    return labeledText.split(';');
}

// Случайный порядок массива
export function compareRandom() {
    return Math.random() - 0.5;
}

// Инвертирует булеву
export function inverseBool(param: boolean) {
    return param === true ? false : true;
}

// Проверяет все свойства объекта на null
export function isNullObj(object: { [key: string]: any }, exclude: Array<string> = []): boolean {
    let haveNull: boolean = true;

    for (let key in object) {
        if (!exclude.find((exc) => exc === key)) {
            if (object[key] !== null) {
                return false;
            }
        }
    }

    return haveNull;
}

// Сравнение массивов
export function compareEqual(a: Array<any>, b: Array<any>) {
    return JSON.stringify(a) === JSON.stringify(b);
}

// Преобразует px в rem
export function pxToRem(size: number) {
    return String((size / 14) * 1) + 'rem';
}

// Добавляет количественный префикс к числу
export function numRusPrefix(num: number): string {
    if (num === 1) {
        return 'го';
    } else if (num > 1 && num <= 4) {
        return 'х';
    } else {
        return 'и';
    }
}

// Короткие названия месяцев
export const monthsName: Array<string> = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
];

// Длинные названия месяцев
export const monthsNameLong: Array<string> = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июня',
    'Июля',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

export const weekDayName = ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

// Склоняет существительные в русском языке
export function declOfNum(number: number, titles: Array<string>) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

export function round2dec(num: number) {
    return Math.round(num * 100) / 100;
}

export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function leadZero(num: number): string {
    return num >= 10 ? String(num) : '0' + num;
}

// Отпечаток устройства
export function getFingerprint(): string {
    try {
        if (Platform.OS === 'android') {
            return Platform.OS + ' | ' + Platform.Version;
        }
        // @ts-ignore
        return Platform.__constants.systemName + ' | ' + Platform.__constants.osVersion;
    } catch (e) {
        return '';
    }
}

// Случайное число в диапазоне
export function randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

// Отформатированный номер телефона
export function formatPhone(value: string): string {
    if (value.length != 12) {
        return value;
    }
    if (value.length > 3 && value.length <= 6) value = value.slice(0, 3) + '-' + value.slice(3);
    else if (value.length > 6)
        value =
            value.slice(0, 2) +
            ' (' +
            value.slice(2, 5) +
            ') ' +
            value.slice(5, 8) +
            '-' +
            value.slice(8, 10) +
            '-' +
            value.slice(10, 12);

    return value;
}

// Очистка номера от спецсимволов
const REGEXP_PHONE_PLUS = /[^0123456789+]/g;
export function cleanPhoneNumber(srcNumber: string): string {
    let num = srcNumber.replace(REGEXP_PHONE_PLUS, '');
    return num;
}

// Очистка номера от спецсимволов
const REGEXP_PHONE = /[^0123456789]/g;
export function cleanPhoneNumberOnlyNum(srcNumber: string): string {
    let num = srcNumber.replace(REGEXP_PHONE, '');
    return num;
}

// Объеденияет два массива по ID. Второй массив перезаписывает первый
export function mergeArray<T>(a: Array<T & { id: number }>, b: Array<T & { id: number }>) {
    var reduced = a.filter((aitem) => !b.find((bitem) => aitem.id === bitem.id));
    return reduced.concat(b);
}

const REG_LINE_BREAKS = /(\r\n|\n|\r)/gm;

// Вырезать текст
export function removeLineBreaks(str: string): string {
    return str.replace(REG_LINE_BREAKS, '');
}

// Вычисляет разницу массивов
export function arrayDiff<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
    let diff: Array<T> = [];
    for (let key in arr1) {
        let finded = arr2.find((x) => x === arr1[key]);
        if (!finded) {
            diff.push(arr1[key]);
        }
    }
    return diff;
}

// Выдает временной идентификатор
export function getTempID(namespace: number): number {
    let unix = Math.round(new Date().getTime() / 1000);
    let rand = Math.round(randomNumber(100, 999));
    return Number(namespace + '' + unix + '' + rand);
}

// Генерация хэш
export function hashGenerate(str: string): number {
    var hash = 0,
        i,
        chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export class Base64 {
    _str: string = '';
    _keyStr: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    constructor(str: string) {
        this._str = str;
    }

    encode = () => {
        let input = this._str;
        var output = '';
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = this.utf8_encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output =
                output +
                this._keyStr.charAt(enc1) +
                this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) +
                this._keyStr.charAt(enc4);
        } // Whend

        return output;
    };

    decode = () => {
        let input = this._str;

        var output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }

            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        } // Whend

        output = this.utf8_decode(output);

        return output;
    };

    private utf8_encode = (string: string) => {
        var utftext = '';
        string = string.replace(/\r\n/g, '\n');

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        } // Next n

        return utftext;
    };

    private utf8_decode = (utftext: string) => {
        var string = '';
        var i = 0;
        var c, c1, c2, c3;
        c = c1 = c2 = 0;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if (c > 191 && c < 224) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        } // Whend

        return string;
    };
}

export function customEncrypt(str: string): string {
    var output = '';
    for (var i = 0, len = str.length; i < len; i++) {
        var character = str[i];
        if (character == character.toLowerCase()) {
            output = output + character.toUpperCase();
        } else {
            output = output + character.toLowerCase();
        }
    }
    return output;
}

export function customDecrypt(str: string): string {
    var output = '';
    for (var i = 0, len = str.length; i < len; i++) {
        var character = str[i];
        if (character == character.toUpperCase()) {
            output = output + character.toLowerCase();
        } else {
            output = output + character.toUpperCase();
        }
    }
    return output;
}

export function sliceStr(source: string, max: number = 30): string {
    let str = source.slice(0, max);
    if (source.length > max) {
        str = str + '...';
    }
    return str;
}

// Первая буква с заглавной
export function toFirstUppercase(str: string) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}

// Переход в мессенджер
export function toWhatsApp(phone: string, text: string) {
    phone = cleanPhoneNumberOnlyNum(phone);
    text = encodeURIComponent(`[Vodopad Drive][v${packageJSON.version}] ${text}`);

    Linking.openURL(`https://wa.me/${phone}/?text=${text}`);
}

// Валидация почты
export function validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}