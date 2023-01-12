// @flow
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Box, CircularProgress, Container, styled, Typography} from '@mui/material';
import {Header} from '../components/Header';
import {ApiService} from '../services/ApiService';
import {useCookies} from 'react-cookie';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {useAuthContext} from "../context/AuthContextProvider";

type Props = {};
console.log(import.meta.env.VITE_BACKEND_URL);
export const Login = (props: Props) => {
    const {setIsLogin} = useAuthContext();

    const CustomContainer = styled(Container)(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(2),
        },
    }));

    const CustomTextField = styled(TextField)(({theme}) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#E5E5E5',
            },
            '&:hover fieldset': {
                borderColor: '#E5E5E5',
            },
        },
    }));

    const CustomButton = styled(Button)(({theme}) => ({
        backgroundColor: '#000',
        padding: '0.5rem 1.25rem',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#000',
            color: '#fff',
        },
    }));
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useCookies(['accessToken']);
    const [dataLogin, setDataLogin] = React.useState({
        username: '',
        password: '',
    });

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value,
        });
    }
    const [loading, setLoading] = React.useState(false);
    const handelSubmit = async () => {
        setLoading(true);
        try {
            const res = await new ApiService().login(dataLogin);
            if (res.accessToken) {
                setAccessToken('accessToken', res.accessToken);
                setIsLogin(true);
                navigate('/');
            } else {
                toast.error(res.error);
            }
        } catch (e: any) {
            toast.error(e.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box sx={{py: 10}}>
            <Header title={'Login'}/>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px', margin: '0 auto'}}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Username "
                    variant="outlined"
                    name={'username'}
                    value={dataLogin.username}
                    onChange={handelChange}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    name={'password'}
                    value={dataLogin.password}
                    onChange={handelChange}
                />
                <CustomButton onClick={handelSubmit} fullWidth variant="contained">
                    Login
                </CustomButton>
            </Box>
        </Box>
    );
};
