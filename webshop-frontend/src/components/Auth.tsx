import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStateContext } from '../ConTextProvider';

interface OwnProps {}

type Props = OwnProps;

export const Auth: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();
    const { isLogin } = useStateContext();
    React.useEffect(() => {
        if (!isLogin) {
            toast('Please login to continue', {
                position: 'top-center',
            });
            const timeout = setTimeout(() => {
                navigate('/login');
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [isLogin]);
    return <></>;
};
