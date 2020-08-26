export interface MenuContextItem {
    value: string;
    color: string;
    onPress: () => void;
}

export const initialMenuContextItem: MenuContextItem = {
    value: '',
    color: '',
    onPress: () => {},
};