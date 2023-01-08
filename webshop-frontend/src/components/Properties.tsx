import React, { FunctionComponent } from 'react';
import { Box, Container, Grid, styled, Typography } from '@mui/material';
import { Font } from './Font';
import { ApiService } from '../services/ApiService';
import { useCookies } from 'react-cookie';
import { useAuthContext } from '../context/AuthContextProvider';
interface OwnProps {}

type Props = OwnProps;

export interface FontI {
    id: number;
    name: string;
    path_image: string;
    link_download: string;
    price: number;
    price_license: number;
    createdAt: string;
    updatedAt: string;
    user: {
        id: number;
        name: string;
        email: string;
        username: string;
        password: string;
        hainamcoin_id: number;
        access_token: string;
    };
    options: {
        value: number;
        description: string;
    };
    value: number;
    description: string;
}
export const Properties: FunctionComponent<Props> = (props) => {
    const checkBuy = (font: FontI) => {
        return font.options.value === 1;
    };
    const { isLogin } = useAuthContext();
    const [accessToken, setAccessToken] = useCookies(['accessToken']);
    const PropertiesGrid = styled(Grid)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(5),
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    }));

    const PropertiesTextBox = styled(Box)(({ theme }) => ({
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
        },
    }));

    const [fonts, setFonts] = React.useState<FontI[]>([]);
    React.useEffect(() => {
        if (isLogin) {
            new ApiService().getAllFonts(accessToken.accessToken).then((res) => {
                setFonts(res);
                console.log(res);
            });
        } else {
            new ApiService().getAllFontsWithOutLogin().then((res) => {
                setFonts(res);
                console.log(res);
            });
        }
    }, [isLogin]);
    return (
        <Box sx={{ mt: 5, backgroundColor: '#F5FAFE', py: 10 }}>
            <Container>
                <PropertiesTextBox>
                    <Typography sx={{ color: '#000339', fontSize: '35px', fontWeight: 'bold' }}>
                        Font Library
                    </Typography>
                    <Typography sx={{ color: '#5A6473', fontSize: '16px', mt: 1 }}>
                        We have a large collection of fonts for you to choose from
                    </Typography>
                </PropertiesTextBox>

                <PropertiesGrid container spacing={5} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {fonts.map((font) => (
                        <Grid item xs={4} sm={4} md={4} key={font.id}>
                            <Font
                                id={font.id}
                                img={'https://picsum.photos/500/300'}
                                name={font.name}
                                price={font.price_license + ''}
                                priceLicense={font.price_license + ''}
                                user={font.user}
                                isBuy={checkBuy(font)}
                            />
                        </Grid>
                    ))}
                </PropertiesGrid>
            </Container>
        </Box>
    );
};
