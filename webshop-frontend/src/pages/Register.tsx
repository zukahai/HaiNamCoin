// @flow
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Container, styled, Typography } from '@mui/material';
import { Header } from '../components/Header';
type Props = {};
export const Register = (props: Props) => {
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
    return (
        <Box sx={{ py: 10 }}>
            <Header title={'Register'} />
            <CustomContainer maxWidth="sm">
                <CustomTextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
                <CustomTextField fullWidth id="outlined-basic" label="Password" variant="outlined" />
                <CustomButton fullWidth variant="contained">
                    Register
                </CustomButton>
            </CustomContainer>
        </Box>
    );
};
