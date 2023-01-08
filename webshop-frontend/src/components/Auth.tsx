import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContextProvider';

interface OwnProps {}

type Props = OwnProps;

export const Auth: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();
    const { isLogin } = useAuthContext();
    React.useEffect(() => {
        if (!isLogin) {
            const timeout = setTimeout(() => {
                navigate('/login');
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [isLogin]);
    return <></>;
};
