// @flow
import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Container, FormControl, styled, Typography } from '@mui/material';
import { Header } from '../components/Header';
import { useAuthContext } from '../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
type Props = {};
export const Register = (props: Props) => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const { isLogin } = useAuthContext();
    React.useEffect(() => {
        if (isLogin) {
            navigate('/');
        }
    }, [isLogin]);
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
        padding: '1rem 1.25rem',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#000',
            color: '#fff',
        },
    }));
    const [form, setForm] = React.useState({ email: '', password: '', confirmPassword: '', username: '' });
    const handelChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
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
                        name="username"
                        value={form.username}
                        onChange={handelChange}
                    />
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Email "
                        variant="outlined"
                        name="email"
                        value={form.email}
                        onChange={handelChange}
                    />
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Password "
                        variant="outlined"
                        name="password"
                        value={form.password}
                        onChange={handelChange}
                    />

                    <TextField
                        type={'password'}
                        fullWidth
                        id="outlined-basic"
                        label="Confirm Password "
                        variant="outlined"
                        name="confirmPassword"
                        onChange={handelChange}
                        value={form.confirmPassword}
                    />
                    <CustomButton type={'submit'} onClick={() => {}} fullWidth variant="contained">
                        Register
                    </CustomButton>
                </FormControl>
            </Box>
        </Box>
    );
};
