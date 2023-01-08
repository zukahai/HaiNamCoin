import React, { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AuthService } from '../services/authService';
import { data } from 'autoprefixer';

type PropsUser = {
    children: React.ReactNode;
};
type User = {
    name: string;
    accessToken: string;
    refreshToken: string;
    email: string;
    totalMoney: number;
    public_key: string;
    private_key: string;
};

type State = {
    user: User;
    setUser: (user: User) => void;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
};
const initialUser: User = {
    name: '',
    accessToken: '',
    refreshToken: '',
    email: '',
    totalMoney: 0,
    public_key: '',
    private_key: '',
};

export const AuthContext = createContext<State>({
    user: initialUser,
    setUser(user: User): void {},
    isLogin: false,
    setIsLogin(isLogin: boolean): void {},
});
export const AuthProvider = ({ children }: PropsUser) => {
    const [accessToken] = useCookies(['accessToken']);
    const authService = new AuthService();
    const [isLogin, setIsLogin] = useState(false);
    React.useEffect(() => {
        if (accessToken.accessToken) {
            authService.getCurrentUser(accessToken.accessToken).then((res) => {
                if (res.data) {
                    const totalMoney = res.data.totalMoney;
                    setUser({ ...res.data.user, totalMoney });
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                    setUser(initialUser);
                }
            });
        }
    }, [isLogin, setIsLogin, accessToken.accessToken]);
    const [user, setUser] = useState<User>(initialUser);
    return <AuthContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>{children}</AuthContext.Provider>;
};
export const useAuthContext = () => useContext(AuthContext);
