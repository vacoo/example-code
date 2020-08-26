import { TARIFF } from '@resources/billing/_tariff';

export interface Supplier {
    id: number;
    name: string;
    phones: Array<string>;
    email: string;
    one_price: number;
    one_tara_price: number;
    balance: number;
    tariff: TARIFF;
    soft_disable: boolean;
    soft_disable_comment: string;
}

export const initialSupplier: Supplier = {
    id: 0,
    name: '',
    phones: [],
    email: '',
    one_price: 0,
    one_tara_price: 0,
    balance: 0,
    tariff: 0,
    soft_disable: false,
    soft_disable_comment: '',
};
