import moment from 'moment-timezone';
import momentRU from 'moment/locale/ru' 

import { leadZero, declOfNum } from '@resources/utils';

export interface UnixSection {
    title: string;
    data: number[]
}

moment.defineLocale("ru", momentRU)

// Часовой пояс
var TIMEZONE = 'Asia/Yakutsk';

// Установка часового пояса
export function setTimezone(t: string) {
    TIMEZONE = t;
}

// Получение часового пояса
export function getTimezone(): string {
    return TIMEZONE;
}

// Текущее время в unix
export function getNowUnix(): number {
    return moment().unix();
}


// Date => Unix
export function dateToUnix(date: Date): number {
    return Math.round(date.getTime() / 1000);
}

// Unix => Date
export function unixToDate(unix: number): Date {
    let date = new Date()
    date.setTime(unix * 1000);
    return date;
}

// Форматирование даты день месяц
export function formatUnixDM(unix: number): string {
    return moment(unix*1000).tz(getTimezone()).format("DD MMMM")
}

// Отформатированная unix дата
interface FormatDateOptions {
    showTomorrow?: boolean;
    isFullMonth?: boolean;
    replaceNearestDate?: boolean;
    replaceToday?: boolean;
}
export function formatDate(unix: number, options?: FormatDateOptions): string {
    if (!unix) {
        return ''
    }
    let dateYesterday = moment(getNowUnix()*1000).tz(getTimezone()).subtract(1, 'days');
    let dateNow =  moment(getNowUnix()*1000).tz(getTimezone());
    let dateTomorrow =  moment(getNowUnix()*1000).tz(getTimezone()).add(1, 'days');

    let date = moment(unix*1000).tz(getTimezone())

    let isYesterday =
        dateYesterday.date() === date.date() &&
        dateYesterday.month() === date.month() &&
        dateYesterday.year() === date.year();

    let isToday =
        dateNow.date() === date.date() &&
        dateNow.month() === date.month() &&
        dateNow.year() === date.year();

    let isTomorrow =
        dateTomorrow.date() === date.date() &&
        dateTomorrow.month() === date.month() &&
        dateTomorrow.year() === date.year();

    if (options?.replaceToday && isToday) {
        return 'сегодня';
    }

    if(options?.replaceNearestDate) {
        if (isYesterday) {
            return 'вчера';
        } else if (isToday) {
            return 'сегодня';
        } else if (isTomorrow && options?.showTomorrow) {
            return 'завтра';
        }
    }
  
    let patternMonth = "MMM"
    if(options?.isFullMonth) {
        patternMonth = "MMMM"
    }

    return date.format("DD " + patternMonth)
}

// Возвращает true если дата совпадает с сегодняшним
export function isTodayDate(unix: number): boolean {
    let dateNow =  moment(getNowUnix()*1000).tz(getTimezone());
    let date = moment(unix*1000).tz(getTimezone())
    return dateNow.date() === date.date() && dateNow.month() === date.month() && dateNow.year() === date.year();
}

// Возвращает true если дни совпадают
export function isDayEquals(unix1: number, unix2: number): boolean {
    let date2 =  moment(unix2*1000).tz(getTimezone());
    let date1 = moment(unix1*1000).tz(getTimezone())
    return date2.date() === date1.date() && date2.month() === date1.month() && date2.year() === date1.year();
}

// Отформатированная unix время
export function formatTime(unix: number): string {
    return moment(unix*1000).tz(getTimezone()).format("HH:mm")
}

// Отформатированная unix в спецформате
export function formatDateYYYYMMDD(unix: number): string {
    return moment(unix*1000).tz(getTimezone()).format("YYYY-MM-DD")
}

// Отформатированная unix в спецформате
export function formatDateYYYYMM(unix: number): string {
    return moment(unix*1000).tz(getTimezone()).format("YYYY-MM")
}

// Отформатированная unix в спецформате
export function formatDateMMMM(unix: number): string {
    return moment(unix*1000).tz(getTimezone()).format("MMMM")
}

// Отформатированная unix в спецформате
export function formatDateDDMMMMYYYY(unix: number): string {
    return moment(unix*1000).tz(getTimezone()).format("DD MMMM YYYY")
}

// Отформатированная unix в спецформате
export function formatDateDDMMM(unix: number): string {
    return moment(unix*1000).tz(getTimezone()).format("DD MMM")
}

// Преобразует минуты в часы и минуты
export function minuteToHM(minute: number): { hour: number; minute: number } {
    return { hour: Math.floor(minute / 60), minute: minute % 60 };
}

// Возвращает текстовое представление диапозона минут
export function getHMRangeLabels(fromM: number, toM: number): [string, string] {
    let hmFrom = minuteToHM(fromM);
    let hmTo = minuteToHM(toM);
    let labelFrom = `с ${leadZero(hmFrom.hour)}:${leadZero(hmFrom.minute)}`;
    let labelTo = `до ${leadZero(hmTo.hour)}:${leadZero(hmTo.minute)}`;

    return [labelFrom, labelTo];
}

// Таймер
export interface Countdown {
    millisecond: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
}
export function getCountdown(unix: number): Countdown {
    unix = unix*1000;
    let days = Math.floor(unix / (1000 * 60 * 60 * 24));
    let hours = Math.floor((unix % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((unix % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((unix % (1000 * 60)) / 1000);
    let millisecond = Math.floor(unix / (1000 * 60 * 60 * 24));
    return {
        millisecond: millisecond,
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        days: days,
    };
}

// Возвращает оставшиеся секунды
export function getLeftSeconds(end: number): number {
    let now = getNowUnix();
    let left = end - now;
    return left >= 0 ? left : 0;
}

export const SECONDS_IN_DAY = 86400;
export const SECONDS_IN_HOUR = 3600;

// Человекочитаемый таймер обратного отсчета
export function getCountdownLabel(countdown: Countdown, diff: number): string {
    const { days, hours, minutes } = countdown

    let declDays = declOfNum(days, ['день', 'дня', 'дней']);
    let declHours = declOfNum(hours, ['час', 'часа', 'часов']);
    let declMinutes = declOfNum(minutes, ['минуту', 'минуты', 'минут']);

    let label = '';

    let labelMinute = minutes ? minutes + ' ' + declMinutes : '';

    if (diff > SECONDS_IN_DAY) {
        label = days + ' ' + declDays;
    }

    if (diff <= SECONDS_IN_DAY && diff >= SECONDS_IN_HOUR) {
        label = hours + ' ' + declHours + ' ' + labelMinute;
    }

    if (diff <= SECONDS_IN_HOUR) {
        label = labelMinute;
    }

    return label;
}