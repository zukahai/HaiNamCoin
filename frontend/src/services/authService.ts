import axios, { AxiosRequestConfig } from 'axios';
const appUrl = import.meta.env.VITE_REACT_APP_API_URL;
export interface IUser {
    name: string;
    email: string;
    public_key: string;
}
export class AuthService {
    appUrl: string = appUrl || '';
    async login(email: string, password: string): Promise<any> {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: this.appUrl + '/login',
            data: {
                email,
                password,
            },
        };
        try {
            const response = await axios(config);
            return { data: response.data };
        } catch (error: any) {
            return { error: error.response.data.message };
        }
    }

    async getCurrentUser(accessToken: string): Promise<any> {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: this.appUrl + '/user/current-user',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const response = await axios(config);
            return { data: response.data };
        } catch (error: any) {
            return { error: error.response.data.message };
        }
    }

    async register(email: string, username: string, name: string, password: string, passwordConfirm: string) {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: this.appUrl + '/register',
            data: {
                email,
                username,
                name,
                password,
                passwordConfirm,
            },
        };
        try {
            const response = await axios(config);
            return { data: response.data };
        } catch (error: any) {
            return { error: error.response.data.message };
        }
    }

    async getAllUsers(accessToken: string): Promise<any> {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: this.appUrl + '/user',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const response = await axios(config);
            return { data: response.data };
        } catch (error: any) {
            return { error: error.response.data.message };
        }
    }
    async getAccessToken(accessToken: string): Promise<any> {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: this.appUrl + '/get-access-token',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const response = await axios(config);
            return { data: response.data };
        } catch (error: any) {
            return { error: error.response.data.message };
        }
    }
}
