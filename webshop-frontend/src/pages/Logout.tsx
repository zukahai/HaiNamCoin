import React, { FunctionComponent } from 'react';
import { useStateContext } from '../ConTextProvider';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../components/Auth';

interface OwnProps {}

type Props = OwnProps;

export const Logout: FunctionComponent<Props> = (props) => {
    const [accessToken, setAccessToken, removeAccessToken] = useCookies(['accessToken']);
    const { isLogin, user, setDefault } = useStateContext();
    const navigate = useNavigate();

    React.useEffect(() => {
        setDefault();
        removeAccessToken('accessToken');
        navigate('/login');
    }, [accessToken]);
    return (
        <div>
            <Auth />
        </div>
    );
};
