// @flow
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, styled, Typography } from '@mui/material';
import { Header } from '../components/Header';
import { ApiService } from '../services/ApiService';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

type User = {
    name: string;
    email: string;
    totalMoney: number;
};
type Props = {};
export const ConnectAccessToken = (props: Props) => {
    const [accessTokenSend, setAccessTokenSend] = React.useState('');
    const [accessToken] = useCookies(['accessToken']);
    const [info, setInfo] = React.useState<User>({ name: '', email: '', totalMoney: 0 });
    const [connect, setConnect] = React.useState(false);
    console.log('c');
    const handelSubmit = async () => {
        try {
            console.log(accessTokenSend);
            const data = await new ApiService().connectWallet(accessToken.accessToken, {
                access_token: accessTokenSend,
            });
            if (data.data.error) {
                toast.error(data.data.error);
            } else {
                toast.success('Connect success');
                setConnect(true);
                await getInfo();
            }
        } catch (e: any) {
            toast.error('Connect wallet fail');
        }
    };
    const getInfo = async () => {
        try {
            const data = await new ApiService().checkConnectWallet(accessToken.accessToken);
            if (data.data.user) {
                const totalMoney = data.data.user.totalMoney;
                const name = data.data.user.user.name;
                const email = data.data.user.user.email;
                setInfo({ name, email, totalMoney });
                setConnect(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    React.useEffect(() => {
        getInfo().then();
    }, [accessToken.accessToken]);

    return (
        <Box sx={{ py: 10, spacing: 2 }}>
            <Header title={'Connect Access Token'} />

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: '0 5rem' }}>
                <Grid item xs={6}>
                    <Box sx={{ backgroundColor: '#F5FAFE', padding: '1rem 1.25rem' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            <Typography variant={'h5'}>Connect Access Token</Typography>
                            {connect && (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                    <Typography variant={'h5'}>Info Connect Wallet</Typography>
                                    <TextField disabled label={'Name'} value={info.name} variant={'outlined'} />
                                    <TextField disabled label={'Email'} value={info.email} variant={'outlined'} />
                                    <TextField
                                        disabled
                                        label={'Total Balance'}
                                        value={`${info.totalMoney} HNC`}
                                        variant={'outlined'}
                                    />
                                </Box>
                            )}
                            <TextField
                                sx={{ mt: 2 }}
                                label={'Access Token'}
                                variant={'outlined'}
                                value={accessTokenSend}
                                onChange={(e) => {
                                    setAccessTokenSend(e.target.value);
                                }}
                            />
                            <Button variant={'contained'} onClick={() => handelSubmit()}>
                                Connect
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 5,
                            padding: '2rem 5rem',
                            backgroundColor: '#F5FAFE',
                            borderRadius: '10px',
                        }}
                    >
                        <Typography variant={'h5'}>How to get Access Token</Typography>
                        <Typography variant={'body1'}>
                            - To connect with hai nam coin in order to use HNC to purchase and receive HaiNamCoin, you
                            need to follow these steps:
                        </Typography>
                        <Typography variant={'body1'}>
                            - Register for an account on the hai nam coin website.
                        </Typography>
                        <Typography>
                            - Connect your digital wallet <a href={'http://localhost:3000/'}>here</a> by entering
                        </Typography>
                        <Typography variant={'body1'}>your wallet address and security measures.</Typography>
                        <Typography variant={'body1'}>
                            - Purchase HNC using one of the various payment methods available, such as cash, credit card
                            payment, or other types of digital currency.
                        </Typography>
                        <Typography variant={'body1'}>
                            - Use HNC to purchase and receive HaiNamCoin on the hai nam coin exchange.
                        </Typography>
                        <Typography variant={'body1'}>
                            Note: Before making any trades, make sure you understand the risks associated with trading
                            digital currency and have chosen a reputable exchange.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
