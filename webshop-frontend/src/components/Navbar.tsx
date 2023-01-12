import React, { FunctionComponent, useState } from 'react';
import {
    Box,
    styled,
    Typography,
} from '@mui/material';

import { CustomButton } from './CustomButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from 'react-router-dom';
import {useAuthContext} from "../context/AuthContextProvider";

interface OwnProps {}

type Props = OwnProps;

export const Navbar: FunctionComponent<Props> = (props) => {
    const { isLogin, user } = useAuthContext();
    const [mobileMenu, setMobileMenu] = useState({
        left: false,
    });

    const NavLink = styled(Typography)(({ theme }) => ({
        fontSize: '14px',
        color: '#4F5361',
        fontWeight: 'bold',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff',
        },
    }));

    const NavbarLinksBox = styled(Box)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(5),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    }));

    const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
        cursor: 'pointer',
        display: 'none',
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
    }));

    const NavbarContainer = styled(Box)(({ theme }) => ({
        display: 'flex',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: theme.spacing(2, 4),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(2),
        },
    }));

    const NavbarLogo = styled('img')(({ theme }) => ({
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    }));

    return (
        <NavbarContainer
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                zIndex: 1000,
                width: '100%',
            }}
        >
            <Box display="flex" alignItems="center" justifyContent="center" gap={'2.5rem'}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomMenuIcon onClick={() => setMobileMenu({ left: true })} />
                    <Typography variant="h6" fontWeight="bold" color="#4F5361">
                        HaiNamCoin
                    </Typography>
                </Box>

                <NavbarLinksBox>
                    <Link to={'/'}>
                        <NavLink>Home</NavLink>
                    </Link>
                    <NavLink variant={'body2'}>Features</NavLink>
                    <NavLink variant={'body2'}>Services</NavLink>
                    <NavLink variant={'body2'}>Listed </NavLink>
                    <NavLink variant={'body2'}>Contact</NavLink>
                </NavbarLinksBox>
            </Box>
            {!isLogin ? (
                <Box display="flex" alignItems="center" justifyContent="center" gap={'1rem'}>
                    <Link to={'/login'}>
                        <NavLink variant={'body2'}>Login</NavLink>
                    </Link>
                    <Link to={'/register'}>
                        <NavLink variant={'body2'}>
                            <CustomButton backgroundColor={'#0F1B4C'} color={'#fff'} buttonText={'Register'} />
                        </NavLink>
                    </Link>
                </Box>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" gap={'1rem'}>
                    <NavLink variant={'body2'}>{user.name}</NavLink>
                    <Link to={'/connect-wallet'}>
                        <NavLink variant={'body2'}> Connect Wallet</NavLink>
                    </Link>
                    <Link to={'/logout'}>
                        <NavLink variant={'body2'}> Logout</NavLink>
                    </Link>
                </Box>
            )}
        </NavbarContainer>
    );
};
