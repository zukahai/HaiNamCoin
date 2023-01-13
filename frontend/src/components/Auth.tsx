// @flow
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';

type Props = {};
export const Auth = (props: Props) => {
    const { isLogin } = useAuthContext();
    const navigate = useNavigate();
    React.useEffect(() => {
        setTimeout(() => {
            if (!isLogin) {
                navigate('/login');
            }
        }, 2000);
    }, [isLogin, navigate]);
    return <div></div>;
};
