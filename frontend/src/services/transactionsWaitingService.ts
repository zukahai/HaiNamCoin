import axios, { AxiosRequestConfig } from 'axios';
const appUrl = import.meta.env.VITE_REACT_APP_API_URL;
export interface TransactionI {
    id: string;
    value: string;
    description: string;
    createdAt: string;
    from: UserI;
    to: UserI;
    status: number;
}
export interface ConfirmTransactionsI {
    nonce: string;
    createdAt: string;
    id: string;
}
export interface TransactionWaitingDetailI extends TransactionI {
    confirm_transactions: ConfirmTransactionsI[];
    text_question: string;
    signature: string;
}
export interface UserI {
    id: number;
    name: string;
    email: string;
    public_key: string;
}
export class TransactionWaitingService {
    appUrl: string = appUrl || '';
    accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    async findAll(status: string): Promise<TransactionI[]> {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: this.appUrl + '/transactions-waiting/by',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            params: {
                status: status,
            },
        };
        const response = await axios(config);
        return response.data;
    }

    async findOne(id: string | undefined): Promise<TransactionWaitingDetailI> {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: this.appUrl + '/transactions-waiting/' + id,
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }

    async postConfirmTransaction(id: string, nonce: string): Promise<TransactionWaitingDetailI> {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: this.appUrl + '/confirm-transactions',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            data: {
                nonce: nonce,
                transaction_waiting_id: id,
            },
        };
        const response = await axios(config);
        return response.data;
    }

    async postCheckNonce(id: string, nonce: string) {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: this.appUrl + '/transactions-waiting/checkNonce/' + id + '/' + nonce,
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        };
        const response = await axios(config);
        return response.data;
    }

    async getAllUser(): Promise<UserI[]> {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: this.appUrl + '/user',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        };
        const response = await axios(config);
        return response.data;
    }

    async createTransaction(value: string, to: string, publicKey: string, privateKey: string, signature: string) {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: this.appUrl + '/transactions-waiting',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            data: {
                value: +value,
                to: +to,
                public_key: publicKey,
                private_key: privateKey,
                signature: signature,
            },
        };

        try {
            const response = await axios(config);
            return {
                success: true,
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                data: error.response.data,
            };
        }
    }

    async joinConfirmTransaction(id: string) {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: this.appUrl + '/join-confirm-transactions/',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            data: {
                transaction_waiting_id: +id,
            },
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async joinConfirmTransactionUser(id: string, status: boolean) {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: this.appUrl + '/confirm-transaction-users',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            data: {
                status: status,
                confirm_transaction_id: +id,
            },
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
    async checkTimeTransaction(id: string) {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: this.appUrl + '/transactions-waiting/time?id=' + id,
        };
        try {
            const response = await axios(config);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }

    async getSignature(to: string, value: string) {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: this.appUrl + '/transactions-waiting/generate-signature',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            data: {
                to: +to,
                value: +value,
            },
        };
        try {
            const response = await axios(config);
            return {
                success: true,
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                data: error,
            };
        }
    }

    async checkSignature(publicKey: string, signature: string) {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: this.appUrl + '/transactions-waiting/get-signature',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
            data: {
                public_key: publicKey,
                signature: signature,
            },
        };
        try {
            const response = await axios(config);
            return {
                success: true,
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                data: error.response.data,
            };
        }
    }
}
