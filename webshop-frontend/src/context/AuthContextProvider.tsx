import React, { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { ApiService } from '../services/ApiService';

type PropsUser = {
    children: React.ReactNode;
};
type User = {
    id: number;
    name: string;
    email: string;
    username: string;
    hainamcoin_id: string;
    access_token: string;
    fonts: any[];
    font_users: any[];
};

type State = {
    user: User;
    setUser: (user: User) => void;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;

    setDefault: () => void;
};
const initialUser: User = {
    id: 0,
    name: '',
    email: '',
    username: '',
    hainamcoin_id: '',
    access_token: '',
    fonts: [],
    font_users: [],
};

export const AuthContext = createContext<State>({
    user: initialUser,
    setUser(user: User): void {},
    isLogin: false,
    setIsLogin(isLogin: boolean): void {},
    setDefault(): void {},
});
export const AuthProvider = ({ children }: PropsUser) => {
    const [accessToken] = useCookies(['accessToken']);
    const authService = new ApiService();
    const [isLogin, setIsLogin] = useState(false);

    const [user, setUser] = useState<User>(initialUser);
    const setDefault = () => {
        setUser(initialUser);
        setIsLogin(false);
    };
    React.useEffect(() => {
        if (accessToken.accessToken) {
            authService.getCurrentUser(accessToken.accessToken).then((res) => {
                if (res.data) {
                    const totalMoney = res.data.totalMoney;

                    setUser({ ...res.data, totalMoney });
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                    setUser(initialUser);
                }
            });
        }
    }, [isLogin, setIsLogin, accessToken.accessToken]);
    return (
        <AuthContext.Provider value={{ user, setUser, isLogin, setIsLogin, setDefault }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => useContext(AuthContext);
