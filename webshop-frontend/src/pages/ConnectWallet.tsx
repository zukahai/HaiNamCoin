// @flow
import React, { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Card, Container, Grid, styled, Typography } from '@mui/material';
import { Header } from '../components/Header';
import { ApiService } from '../services/ApiService';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

type Props = {};
export const ConnectWallet = (props: Props) => {
    const [accessTokenSend, setAccessTokenSend] = React.useState('');
    const [accessToken] = useCookies(['accessToken']);
    const [isConnect, setIsConnect] = React.useState(false);
    const [isChange, setIsChange] = React.useState(false);
    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccessTokenSend(e.target.value);
    };
    const handelSubmit = async () => {
        try {
            const data = await new ApiService().connectWallet(accessToken.accessToken, {
                access_token: accessTokenSend,
            });
            if (data.data) {
                toast.success('Connect wallet success');
                setIsConnect(true);
                setIsChange(!isChange);
            } else {
                toast.error('Connect fail');
            }
        } catch (e) {
            console.log(e);
            toast.error('Connect fail');
        }
    };

    React.useEffect(() => {
        console.log(accessTokenSend);
    }, [isChange]);

    return (
        <Box sx={{ py: 10 }}>
            <Header title={'Connect Access Token'} />
            <Box sx={{ py: 10, paddingLeft: '10%', paddingRight: '10%' }}>
                <Grid
                    container
                    spacing={2}
                    sx={{ backgroundColor: '#F5FAFE', padding: '2rem 0', borderRadius: '10px' }}
                >
                    <Grid item xs={12} md={6}>
                        <ConnectWalletInfo setIsConnect={setIsConnect} isConnect={isConnect} change={isChange} />
                        <Box sx={{ display: 'flex', marginTop: 2, gap: 2 }}>
                            <TextField
                                label="Access Token"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={handelChange}
                                value={accessTokenSend}
                            />
                            <Button
                                variant={'contained'}
                                sx={{ backgroundColor: '#000339', color: '#fff', marginLeft: 2 }}
                                onClick={() => handelSubmit()}
                            >
                                Connect
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                padding: '0 2rem',
                            }}
                        >
                            <Typography sx={{ color: '#000339', fontSize: '20px', fontWeight: 'bold' }}>
                                How to get access token
                            </Typography>
                            <Typography sx={{ color: '#5A6473', fontSize: '16px' }}>
                                1. Go to{' '}
                                <a
                                    href="http://127.0.0.1:5173/user-profile"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: '#000339' }}
                                >
                                    http://127.0.0.1:5173/user-profile
                                </a>
                            </Typography>
                            <Typography sx={{ color: '#5A6473', fontSize: '16px' }}>
                                2. Click on the "Get Access Token" button
                            </Typography>
                            <Typography sx={{ color: '#5A6473', fontSize: '16px' }}>
                                3. Copy the access token and paste it into the input box above
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

interface PropConnectWalletI {
    isConnect: boolean;
    setIsConnect: (isConnect: boolean) => void;

    change: boolean;
}

type PropConnectWallet = PropConnectWalletI;

export const ConnectWalletInfo: FunctionComponent<PropConnectWallet> = (props) => {
    const [accessToken] = useCookies(['accessToken']);
    const { isConnect, setIsConnect, change } = props;
    const [user, setUser] = React.useState({
        id: '',
        name: '',
        email: '',
        totalMoney: 0,
    });
    React.useEffect(() => {
        getConnectionWallet().then();
    }, [accessToken.accessToken, isConnect, change]);

    const getConnectionWallet = async () => {
        try {
            const data = await new ApiService().getConnectionWallet(accessToken.accessToken);
            console.log(data.data.user);
            if (data.data.user) {
                setIsConnect(true);
                setUser(data.data.user);
            } else {
                setIsConnect(false);
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            {isConnect ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant={'h5'}>Connect Wallet</Typography>
                    <TextField label="ID" variant="outlined" disabled={true} value={user.id} sx={{ width: '100%' }} />
                    <TextField
                        label="Name"
                        variant="outlined"
                        disabled={true}
                        value={user.name}
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        disabled={true}
                        value={user.email}
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        label="Total Money"
                        variant="outlined"
                        disabled={true}
                        value={user.totalMoney}
                        sx={{ width: '100%' }}
                    />
                </Box>
            ) : (
                <></>
            )}
        </>
    );
};
