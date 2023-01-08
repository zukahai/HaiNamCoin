// @flow
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, CircularProgress, Container, FormControl, styled, Typography } from '@mui/material';
import { Header } from '../components/Header';
import { ApiService } from '../services/ApiService';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContextProvider';
type Props = {};
console.log(import.meta.env.VITE_BACKEND_URL);
export const Login = (props: Props) => {
    const CustomTextField = styled(TextField)(({ theme }) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#E5E5E5',
            },
            '&:hover fieldset': {
                borderColor: '#E5E5E5',
            },
        },
    }));

    const CustomButton = styled(Button)(({ theme }) => ({
        backgroundColor: '#000',
        padding: '1rem 1.25rem',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#000',
            color: '#fff',
        },
    }));
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [accessToken, setAccessToken] = useCookies(['accessToken']);
    const { isLogin, setIsLogin } = useAuthContext();
    React.useEffect(() => {
        if (isLogin) {
            navigate('/');
        }
    }, [isLogin]);

    const handelSubmit = async () => {
        setLoading(true);
        try {
            const res = await new ApiService().login(username, password);
            if (res.accessToken) {
                setAccessToken('accessToken', res.accessToken, { path: '/' });
                setIsLogin(true);
                setLoading(false);
                toast.success('Login success');
            }
        } catch (e: any) {
            toast.error(e.response.data.message);
        }
    };
    return (
        <Box sx={{ py: 10, spacing: 2 }}>
            <Header title={'Login'} />
            <Box className={'container'} sx={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '0 20%' }}>
                <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Username "
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        type={'password'}
                        fullWidth
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <CustomButton type={'submit'} onClick={handelSubmit} fullWidth variant="contained">
                        Login
                    </CustomButton>
                </FormControl>
            </Box>
        </Box>
    );
};
