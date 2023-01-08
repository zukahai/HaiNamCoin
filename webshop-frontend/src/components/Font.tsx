import React, { FunctionComponent } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { CustomButton } from './CustomButton';
import { useNavigate } from 'react-router-dom';

interface User {
    name: string;
    email: string;
}
interface OwnProps {
    id: number;
    name: string;
    price: string;
    img: string;
    priceLicense: string;
    user: User;
    isBuy?: boolean;
}

type Props = OwnProps;

export const Font: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();
    const FontBox = styled(Box)(({ theme }) => ({
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        borderRadius: '10px',
        maxWidth: 350,
        backgroundColor: '#fff',
        margin: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            margin: theme.spacing(2, 0, 2, 0),
        },
    }));
    const InfoBox = styled(Box)(() => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }));

    const ImgContainer = styled(Box)(() => ({
        width: '100%',
    }));
    const toDetail = (id: string) => {
        console.log(id);
        navigate(`/font/${id}`);
    };
    return (
        <FontBox>
            <ImgContainer>
                <img src={props.img} alt="housePhoto" style={{ maxWidth: '100%' }} />
            </ImgContainer>

            <Box sx={{ padding: '1rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#F5F5F5',
                            padding: '0.5rem',
                            borderRadius: '10px',
                            minWidth: '200px',
                        }}
                    >
                        <Typography
                            onClick={() => toDetail(props.id.toString())}
                            variant="body2"
                            sx={{ fontWeight: '700' }}
                        >
                            {props.name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Typography variant="body2" sx={{ fontWeight: '700' }}>
                            {props.user.name}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: '700', color: '#000' }}>
                        Price: {props.price} HNC
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: '700', color: '#000' }}>
                        Price License: {props.priceLicense} HNC
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    {props.isBuy ? (
                        <CustomButton backgroundColor={'#000'} color={'#fff'} buttonText={'Download'}></CustomButton>
                    ) : (
                        <Box
                            onClick={() => {
                                toDetail(props.id.toString());
                            }}
                        >
                            <CustomButton backgroundColor={'#000'} color={'#fff'} buttonText={'Buy Now'}></CustomButton>
                        </Box>
                    )}
                </Box>
            </Box>
        </FontBox>
    );
};
