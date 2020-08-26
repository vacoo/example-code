export interface Area {
    id: number;
    supplier_id: number;
    city_id: number;
    name: string;
    points: string;
    soft_removed: boolean;
}

export const initialArea: Area = {
    id: 0,
    supplier_id: 0,
    city_id: 0,
    name: '',
    points: '',
    soft_removed: false,
};

export interface OrderArea {
    area_id: number;
    area_name: string;
}

export const initialOrderArea: OrderArea = {
    area_id: 0,
    area_name: '',
};
