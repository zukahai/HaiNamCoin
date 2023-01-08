// @flow
import React from 'react';
import { Box, Container, styled, Typography } from '@mui/material';
type Props = {
    title: string;
};
export const Header = (props: Props) => {
    return (
        <Box sx={{ backgroundColor: '#F5F5F5', textAlign: 'center', padding: '3rem 0', mt: 2, mb: 4 }}>
            <Container maxWidth="sm">
                <Typography
                    sx={{
                        fontSize: '35px',
                        color: '#1C1C1D',
                        fontWeight: '700',
                        textAlign: 'center',
                    }}
                >
                    {props.title}
                </Typography>
            </Container>
        </Box>
    );
};
