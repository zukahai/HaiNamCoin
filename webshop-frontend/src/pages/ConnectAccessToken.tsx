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

    const [isConnect, setIsConnect] = React.useState(false);
    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccessTokenSend(e.target.value);
    };

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
            if (data.data) {
                toast.success('Connect successfully');
            } else {
                toast.error('Connect fail');
            }
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
            <TextField label="Access Token" variant="outlined" onChange={handelChange} value={accessTokenSend} />
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

interface PropConnectWalletI {
    setIsConnect: React.Dispatch<React.SetStateAction<boolean>>;
}

type PropConnectWallet = PropConnectWalletI;

export const ConnectWalletInfo: FunctionComponent<PropConnectWallet> = (props) => {
    const { setIsConnect } = props;
    const [accessToken] = useCookies(['accessToken']);
    const [user, setUser] = React.useState({
        id: '',
        name: '',
        email: '',
        totalMoney: 0,
    });
    React.useEffect(() => {
        getConnectionWallet().then();
    }, [accessToken.accessToken]);

    const getConnectionWallet = async () => {
        try {
            const data = await new ApiService().getConnectionWallet(accessToken.accessToken);
            if (data.data.user) {
                setIsConnect(true);
            } else {
                setIsConnect(false);
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Box sx={{ py: 10 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
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
                </Grid>
            </Grid>
        </Box>
    );
};
