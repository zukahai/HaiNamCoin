// @flow
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Box, Container, styled, Typography} from '@mui/material';
import {Header} from '../components/Header';
import {ApiService} from "../services/ApiService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

type Props = {};
export const Register = (props: Props) => {

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
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const handelUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const handelPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handelName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handelEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handelConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    const handelSubmit = async () => {
        const dataRegister = {
            name: name,
            username: username,
            password: password,
            email: email,
            confirmPassword: confirmPassword
        }
        const data = await new ApiService().register(dataRegister);
        console.log(data);
        if (data.data) {
            toast.success('Register success');
            const timer = setTimeout(() => {
                navigate('/login');
            }, 1400);
            return () => clearTimeout(timer);
        } else {
            toast.error(data.error);
            setLoading(false);
        }

    }
    return (
        <Box sx={{py: 10}}>
            <Header title={'Register'}/>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px', margin: '0 auto'}}>
                <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handelName}/>
                <TextField id="outlined-basic" label="Username" variant="outlined" onChange={handelUsername}/>
                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handelEmail}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={handelPassword}/>
                <TextField id="outlined-basic" label="Confirm Password" variant="outlined"
                           onChange={handelConfirmPassword}/>

                <CustomButton sx={{mt: 2}} fullWidth variant={'contained'}
                              onClick={handelSubmit}>Register</CustomButton>
            </Box>
        </Box>
    );
};
