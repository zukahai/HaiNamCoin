// @flow
import React from 'react';
import { Box, Button, Card, Container, MenuItem, Select, styled, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { CustomButton } from '../components/CustomButton';
import heroImg from '../media/hero_illustration.png';
import TextField from '@mui/material/TextField';
import { SendBuyCoin } from '../components/SendBuyCoin';
import { ApiService } from '../services/ApiService';
import { useCookies } from 'react-cookie';
import { Auth } from '../components/Auth';

interface User {
    id: string;
    name: string;
    email: string;
}
export interface FontT {
    id: string;
    name: string;
    price: string;
    img: string;
    price_license: string;
    user: User;
    totalBuy: number;
}

type Props = {};

export const FontDetail = (props: Props) => {
    const { id } = useParams();
    const [font, setFont] = React.useState<FontT>({
        id: '',
        name: '',
        price: '',
        img: '',
        price_license: '',
        user: {
            id: '',
            name: '',
            email: '',
        },
        totalBuy: 0,
    });

    const [accessToken, setAccessToken] = useCookies(['accessToken']);
    React.useEffect(() => {
        if (id) {
            new ApiService().getFontById(accessToken.accessToken, id).then((res) => {
                setFont(res);
            });
        }
    }, []);
    const [isEnterPrivateKey, setIsEnterPrivateKey] = React.useState(false);
    const [typeLicense, setTypeLicense] = React.useState('1');
    const handelBuy = (type: string) => {
        if (typeLicense === type) {
            setIsEnterPrivateKey(!isEnterPrivateKey);
        } else {
            setIsEnterPrivateKey(true);
        }
        setTypeLicense(type);
    };
    const CustomContainer = styled(Container)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(2),
        },
    }));

    const ImageContainer = styled(Box)(({ theme }) => ({
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    }));
    const CustomBox = styled(Box)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing(5),
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
    }));

    return (
        <Box sx={{ py: 10 }}>
            <Header title={`Font ${font?.name}`} />
            <Auth />
            <CustomContainer>
                <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '100%', padding: '20px' }}>
                    <CustomBox>
                        <Box sx={{ flex: '1' }}>
                            <img
                                src={'https://picsum.photos/400/300'}
                                alt="heroImg"
                                style={{ maxWidth: '80%', marginBottom: '2rem', borderRadius: '10px' }}
                            />
                        </Box>
                        <Box sx={{ flex: '1.25' }}>
                            <Typography
                                sx={{
                                    color: '#000339',
                                    fontSize: '35px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {font?.name}
                            </Typography>
                            <Typography
                                variant={'h6'}
                                sx={{
                                    backgroundColor: '#F5F5F5',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '10px',
                                    color: '#000339',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    marginTop: '1rem',
                                }}
                            >
                                By: {font?.user.name}
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#5A6473',
                                    fontSize: '16px',
                                    mt: 2,
                                }}
                            >
                                Font is a visual representation of a text. It is a set of characters that are designed
                                to be used together. The font is a set of characters that are designed to be used
                                together.
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
                                <Typography
                                    variant={'h6'}
                                    sx={{
                                        backgroundColor: '#F5F5F5',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '10px',
                                        color: '#000339',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        minWidth: 'calc(100% / 3 - 1rem)',
                                    }}
                                >
                                    Price: {font?.price} HNC
                                </Typography>
                                <Typography
                                    variant={'h6'}
                                    sx={{
                                        backgroundColor: '#F5F5F5',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '10px',
                                        color: '#000339',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        minWidth: 'calc(100% / 3 - 1rem)',
                                    }}
                                >
                                    Price License: {font?.price_license} HNC
                                </Typography>
                                <Typography
                                    variant={'h6'}
                                    sx={{
                                        backgroundColor: '#F5F5F5',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '10px',
                                        color: '#000339',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        minWidth: 'calc(100% / 3 - 1rem)',
                                    }}
                                >
                                    Total Buy: {font?.totalBuy}
                                </Typography>
                            </Box>

                            <Button
                                onClick={() => handelBuy('1')}
                                variant={'contained'}
                                sx={{
                                    mt: 4,
                                    backgroundColor: '#000339',
                                    color: '#fff',
                                    padding: '0.5rem 1rem',
                                    mr: 2,
                                    minWidth: 'calc(100% / 2 - 1rem)',
                                }}
                            >
                                Buy Font
                            </Button>
                            <Button
                                onClick={() => handelBuy('2')}
                                variant={'contained'}
                                sx={{
                                    mt: 4,
                                    backgroundColor: '#000339',
                                    color: '#fff',
                                    padding: '0.5rem 1rem',
                                    minWidth: 'calc(100% / 2 - 1rem)',
                                }}
                            >
                                Buy Font License
                            </Button>
                        </Box>
                    </CustomBox>
                </Card>

                {isEnterPrivateKey && <SendBuyCoin font={font} type={typeLicense} />}
            </CustomContainer>
        </Box>
    );
};
