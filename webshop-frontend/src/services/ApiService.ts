import axios, { AxiosRequestConfig } from 'axios';
export class ApiService {
    urlApi = import.meta.env.VITE_BACKEND_URL ?? 'http://192.168.1.20:3000';

    async login(username: string, password: string) {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.urlApi}/auth/login`,
            data: {
                username,
                password,
            },
        };
        const response = await axios(config);
        try {
            return {
                accessToken: response.data,
            };
        } catch (error: any) {
            return {
                error: error.response.data.message,
            };
        }
    }
    async getCurrentUser(accessToken: string) {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${this.urlApi}/auth/get-current-user`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await axios(config);
        try {
            return response.data;
        } catch (error: any) {
            return error.response.data.message;
        }
    }
    async getAllFonts(accessToken: string) {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${this.urlApi}/fonts/user`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await axios(config);
        try {
            return response.data;
        } catch (error: any) {
            return error.response.data.message;
        }
    }
    async getAllFontsWithOutLogin() {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${this.urlApi}/fonts`,
            headers: {},
        };
        const response = await axios(config);
        try {
            return response.data;
        } catch (error: any) {
            return error.response.data.message;
        }
    }
    async getFontById(accessToken: string, id: string) {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${this.urlApi}/fonts/${id}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await axios(config);
        try {
            return response.data;
        } catch (error: any) {
            return error.response.data.message;
        }
    }
    async createSmartContract(accessToken: string, data: any) {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.urlApi}/smart-contract`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

            data: {
                private_key: data.private_key,
                value: +data.value,
                to: +data.to,
                font_id: +data.font_id,
                type: +data.type,
            },
        };
        console.log(config);
        const response = await axios(config);
        try {
            return response.data;
        } catch (error: any) {
            return error.response.data.message;
        }
    }
    async connectWallet(accessToken: string, data: any) {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.urlApi}/user/connect-hainamcoin`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            data: {
                access_token: data.access_token,
            },
        };
        try {
            const response = await axios(config);
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return error.response.data.message;
        }
    }
}
