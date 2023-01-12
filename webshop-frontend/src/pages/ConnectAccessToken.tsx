// @flow
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Card, Container, styled, Typography } from '@mui/material';
import { Header } from '../components/Header';
import { ApiService } from '../services/ApiService';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

type Props = {};
export const ConnectAccessToken = (props: Props) => {
    const [accessTokenSend, setAccessTokenSend] = React.useState('');
    const [accessToken, setAccessToken] = useCookies(['accessToken']);
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

    const handelSubmit = async () => {
        try {
            const data = await new ApiService().connectWallet(accessToken.accessToken, {
                access_token: accessTokenSend,
            });

            toast.success('Connect success');
        } catch (e) {
            console.log(e);
            toast.error('Connect fail');
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
            <Header title={'Connect Access Token'} />
            <TextField
                label="Access Token"
                variant="outlined"
                onChange={(e) => setAccessTokenSend(e.target.value)}
                value={accessTokenSend}
            />
            <Box sx={{ display: 'flex' }}>
                <Button
                    variant={'contained'}
                    sx={{ backgroundColor: '#000339', color: '#fff' }}
                    onClick={() => handelSubmit()}
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};
