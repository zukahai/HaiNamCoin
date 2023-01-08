import React, { FunctionComponent } from 'react';
import { Box, Container, styled, Typography } from '@mui/material';
import logoImg from '../media/logo.png';
import starsImg from '../media/Star.png';
import logosImg from '../media/logos.png';
interface OwnProps {}

type Props = OwnProps;

export const Companies: FunctionComponent<Props> = (props) => {
    const CustomContainer = styled(Container)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: theme.spacing(4),
        },
    }));

    const CustomBox = styled(Box)(({ theme }) => ({
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(4),
        },
    }));

    return (
        <Box sx={{ mt: 10 }}>
            <CustomContainer>
                <CustomBox>
                    <Typography variant="h6" fontWeight="bold" color="#4F5361">
                        HaiNamCoin
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#7D8589',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            mt: 2,
                        }}
                    >
                        More than 45,000 trust HaiNamCoin
                    </Typography>
                </CustomBox>

                <Box>
                    <img src={starsImg} alt="stars" style={{ maxWidth: '100%' }} />
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#7D8589',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            mt: 2,
                        }}
                    >
                        5-Star Rating (2k+ Reviews)
                    </Typography>
                </Box>
            </CustomContainer>

            <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                <img src={logosImg} alt="logos" />
            </Container>
        </Box>
    );
};
