import React, { FunctionComponent } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../components/Auth';
import { useAuthContext } from '../context/AuthContextProvider';

interface OwnProps {}

type Props = OwnProps;

export const Logout: FunctionComponent<Props> = (props) => {
    const [accessToken, setAccessToken, removeAccessToken] = useCookies(['accessToken']);
    const { isLogin, user, setDefault } = useAuthContext();
    const navigate = useNavigate();

    React.useEffect(() => {
        removeAccessToken('accessToken');
        setDefault();
        navigate('/login');
    }, [accessToken]);
    return (
        <div>
            <Auth />
        </div>
    );
};
