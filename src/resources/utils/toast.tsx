import { showMessage } from 'react-native-flash-message';

export function showError(message: string, description: string = '') {
    showMessage({
        icon: 'danger',
        type: 'danger',
        message: message,
        description: description,
        duration: 2000,
    });
}

export function showSuccess(message: string, description: string = '') {
    showMessage({
        icon: 'success',
        type: 'success',
        message: message,
        description: description,
        duration: 2000,
    });
}

export function showDanger(message: string, description: string = '') {
    showMessage({
        icon: 'warning',
        type: 'warning',
        message: message,
        description: description,
        duration: 2000,
    });
}

export function showInfo(message: string, description: string = '') {
    showMessage({
        icon: 'info',
        type: 'info',
        message: message,
        description: description,
        duration: 2000,
    });
}
