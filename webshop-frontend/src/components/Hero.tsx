import React, { FunctionComponent } from 'react';
import { Box, Container, styled, Typography } from '@mui/material';
import { Navbar } from './Navbar';
import { CustomButton } from './CustomButton';
import heroImg from '../media/hero_illustration.png';
interface OwnProps {}

type Props = OwnProps;

export const Hero: FunctionComponent<Props> = (props) => {
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

    const Title = styled(Typography)(({ theme }) => ({
        fontSize: '64px',
        color: '#000336',
        fontWeight: 'bold',
        margin: theme.spacing(4, 0, 4, 0),
        [theme.breakpoints.down('sm')]: {
            fontSize: '40px',
        },
    }));

    return (
        <Box sx={{ backgroundColor: '#E6F0FF', minHeight: '80vh' }}>
            <Container>
                <CustomBox>
                    <Box sx={{ flex: '1' }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '18px',
                                color: '#687690',
                                fontWeight: '500',
                                mt: 10,
                                mb: 4,
                            }}
                        >
                            Welcome to HaiNamCoin (HNC)
                        </Typography>
                        <Title variant="h1"> The Future of Finance </Title>
                        <Typography variant="body2" sx={{ fontSize: '18px', color: '#5A6473', my: 4 }}>
                            HaiNamCoin is a decentralized digital currency that allows you to send money
                        </Typography>
                        <CustomButton
                            backgroundColor="#0F1B4C"
                            color="#fff"
                            buttonText="More About Us"
                            heroBtn={true}
                        />
                    </Box>

                    <Box sx={{ flex: '1.25' }}>
                        <img src={heroImg} alt="heroImg" style={{ maxWidth: '100%', marginBottom: '2rem' }} />
                    </Box>
                </CustomBox>
            </Container>
        </Box>
    );
};
