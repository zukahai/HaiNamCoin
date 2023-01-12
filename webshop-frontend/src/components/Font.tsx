import React, { FunctionComponent } from 'react';
import { Box, Link, styled, Typography } from '@mui/material';
import { CustomButton } from './CustomButton';
import { useNavigate } from 'react-router-dom';
import { FontI } from './Properties';
import Button from '@mui/material/Button';
const url = import.meta.env.VITE_BACKEND_URL;
interface User {
    name: string;
    email: string;
}

interface OwnProps {
    font: FontI;
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
        <FontBox sx={{ boxShadow: 2 }} style={{ height: '100%', borderRadius: '10px' }}>
            <ImgContainer>
                <img
                    alt="housePhoto"
                    style={{ maxWidth: '400px', maxHeight: '400px', width: '100%', height: '100%' }}
                    src={`${url}/fonts/font-image/${props.font.path_image}`}
                />
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
                            onClick={() => toDetail(props.font.id.toString())}
                            variant="body2"
                            sx={{ fontWeight: '700' }}
                        >
                            {props.font.name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Typography variant="body2" sx={{ fontWeight: '700' }}>
                            {props.font.user.name}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: '700', color: '#000' }}>
                        Price: ${props.font.price}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: '700', color: '#000' }}>
                        Price License: ${props.font.price_license}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    {props.font.options.value === 2 ? (
                        <>
                            <CustomButton backgroundColor={'#000'} color={'#fff'} buttonText={'License'}></CustomButton>
                            <Button variant="contained" sx={{ backgroundColor: '#000', color: '#fff' }}>
                                <Link
                                    href={`${url}/fonts/font-file/${props.font.link_download}`}
                                    download
                                    sx={{ color: '#fff', textDecoration: 'none', padding: '0.2rem' }}
                                >
                                    Download
                                </Link>
                            </Button>
                        </>
                    ) : props.font.options.value === 1 ? (
                        <Button variant="contained" sx={{ backgroundColor: '#000', color: '#fff' }}>
                            <Link
                                href={`${url}/fonts/font-file/${props.font.link_download}`}
                                download
                                sx={{ color: '#fff', textDecoration: 'none', padding: '0.2rem' }}
                            >
                                Download
                            </Link>
                        </Button>
                    ) : (
                        <Box
                            onClick={() => {
                                toDetail(props.font.id.toString());
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
