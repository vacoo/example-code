export interface FileLink {
    name: string;
    url: string;
}

export const initialFileLink: FileLink = {
    name: '',
    url: '',
};

export interface FileInDevice {
    uri: string;
    type?: string;
    name?: string;
}

export const initialFile: FileInDevice = {
    uri: '',
    type: '',
    name: '',
};