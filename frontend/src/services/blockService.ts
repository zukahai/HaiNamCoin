import axios, { AxiosRequestConfig } from 'axios';

const appUrl = import.meta.env.VITE_REACT_APP_API_URL;
export interface BlockI {
    value: string;
    description: string;
    preHashCode: string;
    hashCode: string;
    createdAt: string;
    from: User;
    to: User;
}
interface User {
    name: string;
    email: string;
    public_key: string;
}
export class BlockService {
    appUrl: string = appUrl || '';
    accessToken: string;
    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
    async findAll(): Promise<BlockI[]> {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: this.appUrl + '/block',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        };
        const response = await axios(config);
        return response.data;
    }
    async findByUserId(userId: string): Promise<BlockI[]> {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: this.appUrl + '/block/' + userId,
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        };
        const response = await axios(config);
        return response.data;
    }
}
