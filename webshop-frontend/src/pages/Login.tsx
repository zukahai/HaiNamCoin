// @flow
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, CircularProgress, Container, styled, Typography } from '@mui/material';
import { Header } from '../components/Header';
import { useStateContext } from '../ConTextProvider';
import { ApiService } from '../services/ApiService';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
type Props = {};
console.log(import.meta.env.VITE_BACKEND_URL);
export const Login = (props: Props) => {
    const { user, setUser, setIsLogin } = useStateContext();

    const CustomContainer = styled(Container)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(2),
        },
    }));

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
        padding: '0.5rem 1.25rem',
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
    const handelSubmit = async () => {
        setLoading(true);
        try {
            const res = await new ApiService().login(username, password);
            setAccessToken('accessToken', res.accessToken, { path: '/' });
            toast.success('Login success');
            console.log(accessToken);
            const userDetail = await new ApiService().getCurrentUser(accessToken.accessToken);
            if (userDetail) {
                setUser(userDetail);
                setIsLogin(true);
                navigate('/');
            }
            navigate('/');
        } catch (e: any) {
            toast.error(e.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box
            sx={{
                py: 10,
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                padding: '0 5rem',
            }}
        >
            {loading ? <CircularProgress /> : null}
            <Header title={'Login'} />
            <TextField
                fullWidth
                id="outlined-basic"
                label="Username "
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                fullWidth
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <CustomButton onClick={handelSubmit} fullWidth variant="contained">
                Login
            </CustomButton>
        </Box>
    );
};
