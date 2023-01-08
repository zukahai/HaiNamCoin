import React, { FunctionComponent } from 'react';
import { Box, Container, styled, Typography } from '@mui/material';
import homeIllustration from '../media/illustration.png';
import { CustomButton } from './CustomButton';

interface OwnProps {}

type Props = OwnProps;

export const GetStarted: FunctionComponent<Props> = (props) => {
    const CustomContainer = styled(Container)(({ theme }) => ({
        backgroundColor: '#17275F',
        height: '416px',
        borderRadius: '15px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            height: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3, 3, 0, 3),
            width: '90%',
        },
    }));

    const CustomBox = styled(Box)(({ theme }) => ({
        padding: theme.spacing(10, 0, 10, 0),
        margin: theme.spacing(0, 2, 0, 2),
        [theme.breakpoints.down('md')]: {
            padding: '0',
        },
    }));

    return (
        <CustomBox>
            <CustomContainer>
                <Box>
                    <Typography sx={{ fontSize: '35px', color: 'white', fontWeight: '700' }}>
                        Featured Properties
                    </Typography>
                    <Typography sx={{ fontSize: '16px', color: '#ccc', fontWeight: '500', my: 3 }}>
                        Everything you need to know about houses!
                    </Typography>

                    <CustomButton
                        backgroundColor="#fff"
                        color="#17275F"
                        buttonText="Get Started Now"
                        getStartedBtn={true}
                    />
                </Box>

                <img src={homeIllustration} alt="illustration" style={{ maxWidth: '100%' }} />
            </CustomContainer>
        </CustomBox>
    );
};
