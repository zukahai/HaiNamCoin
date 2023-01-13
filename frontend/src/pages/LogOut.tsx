// @flow
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useCookies } from 'react-cookie';

type Props = {};
export const LogOut = (props: Props) => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken, removeCookie] = useCookies(['accessToken']);
    const { setIsLogin } = useAuthContext();
    React.useEffect(() => {
        removeCookie('accessToken');
        setIsLogin(false);
        navigate('/login');
    }, [navigate, setIsLogin]);
    return (
        <div>
            <h1>LogOut</h1>
        </div>
    );
};
