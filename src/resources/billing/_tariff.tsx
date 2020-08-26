export enum TARIFF {
    PERCENT = 1,
    LITE = 2,
    START = 3,
}

export const TARIFF_LABELS = {
    [TARIFF.PERCENT]: 'Процент от заказа',
    [TARIFF.LITE]: 'Lite',
    [TARIFF.START]: 'Расширенный',
};
