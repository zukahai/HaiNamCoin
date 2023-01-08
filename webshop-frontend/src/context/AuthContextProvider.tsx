import React, { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Api } from '@mui/icons-material';
import { ApiService } from '../services/ApiService';

type User = {
    id: number;
    name: string;
    email: string;
    username: string;
    hainamcoin_id: number;
    access_token: string;
    fonts: any[];
    font_users: any[];
};
const initialUser: User = {
    id: 0,
    name: '',
    email: '',
    username: '',
    hainamcoin_id: 0,
    access_token: '',
    fonts: [],
    font_users: [],
};

type State = {
    user: User;
    setUser: (user: User) => void;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
    setDefault: () => void;
};

export const AuthContext = createContext<State>({
    user: initialUser,
    setUser(user: User): void {},
    isLogin: false,
    setIsLogin(isLogin: boolean): void {},
    setDefault(): void {},
});

type Props = {
    children: React.ReactNode;
};
export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User>(initialUser);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useCookies(['accessToken']);
    const setDefault = () => {
        setUser(initialUser);
        setIsLogin(false);
    };
    React.useEffect(() => {
        new ApiService().getCurrentUser(accessToken.accessToken).then((res) => {
            if (res.data) {
                setUser(res.data);
                setIsLogin(true);
            } else {
                setDefault();
            }
        });
    }, [accessToken, isLogin]);

    return (
        <AuthContext.Provider value={{ user, setUser, isLogin, setIsLogin, setDefault }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
