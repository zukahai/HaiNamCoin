import axios, { AxiosRequestConfig } from 'axios';

export class ApiService {
    urlApi = import.meta.env.VITE_BACKEND_URL ?? 'http://192.168.1.20:3000';

    async login(dataLogin: { password: string; username: string }) {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.urlApi}/auth/login`,
            data: {
                username: dataLogin.username,
                password: dataLogin.password,
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
            return {
                data: response.data,
            };
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
            return {
                data: response.data,
            };
        } catch (error: any) {
            return error.response.data.message;
        }
    }

    async register(dataRegister: {
        password: string;
        name: string;
        confirmPassword: string;
        email: string;
        username: string;
    }) {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.urlApi}/auth/register`,
            data: {
                username: dataRegister.username,
                password: dataRegister.password,
                name: dataRegister.name,
                email: dataRegister.email,
                confirmPassword: dataRegister.confirmPassword,
            },
        };
        try {
            const response = await axios(config);
            return {
                data: response.data,
            };
        } catch (error: any) {
            return {
                error: error.response.data.message,
            };
        }
    }

    async getConnectionWallet(accessToken: string) {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${this.urlApi}/user/check-connect-hainamcoin`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const response = await axios(config);

            return {
                data: {
                    user: { ...response.data.user.user, totalMoney: response.data.user.totalMoney },
                },
            };
        } catch (error: any) {
            return error.response.data.message;
        }
    }

    async createFont(
        name: string,
        description: string,
        price: number,
        priceLicense: number,
        id: number,
        accessToken: any,
    ) {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.urlApi}/fonts`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            data: {
                name,
                description,
                price,
                priceLicense,
                userId: +id,
            },
        };
        console.log(config);
        try {
            const response = await axios(config);
            return {
                data: response.data,
            };
        } catch (error: any) {
            console.log(error);
            return {
                error: error.response.data.message,
            };
        }
    }

    async uploadFont(id: any, file: File | null, accessToken: string) {
        const formData = new FormData();
        formData.append('file', file as Blob);
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.urlApi}/fonts/upload-font/${id}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        };
        try {
            const response = await axios(config);
            return {
                data: response.data,
            };
        } catch (error: any) {
            console.log(error);
            return {
                error: error.response.data.message,
            };
        }
    }

    async uploadImage(id: any, image: File | null, accessToken: string) {
        const formData = new FormData();
        formData.append('file', image as Blob);
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.urlApi}/fonts/upload-image/${id}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        };
        try {
            const response = await axios(config);
            return {
                data: response.data,
            };
        } catch (error: any) {
            return {
                error: error.response.data.message,
            };
        }
    }

    async checkSmartContract(id: string) {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${this.urlApi}/smart-contract/transaction-font/${id}`,
        };
        try {
            const response = await axios(config);
            return {
                data: response.data,
            };
        } catch (error: any) {
            console.log(error);
            return {
                error: error.response.data.message,
            };
        }
    }
}
