import React, { FunctionComponent } from 'react';
import { Box, styled, Typography } from '@mui/material';
import bedroomsIcon from '../media/bedroomsIcon.png';
import bathroomsIcon from '../media/bathroomsIcon.png';
import spaceIcon from '../media/spaceIcon.png';
interface OwnProps {
    img: string;
    price: string;
    address: string;
    bedrooms: number;
    bathrooms: number;
    space: number;
}

type Props = OwnProps;

export const House: FunctionComponent<Props> = (props) => {
    const HouseBox = styled(Box)(({ theme }) => ({
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        maxWidth: 350,
        backgroundColor: '#fff',
        margin: theme.spacing(0, 2, 0, 2),
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

    return (
        <HouseBox>
            <ImgContainer>
                <img src={props.img} alt="housePhoto" style={{ maxWidth: '100%' }} />
            </ImgContainer>

            <Box sx={{ padding: '1rem' }}>
                <Typography variant="body2" sx={{ fontWeight: '700' }}>
                    ${props.price}
                </Typography>
                <Typography variant="body2" sx={{ my: 2 }}>
                    {props.address}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <InfoBox>
                        <img src={bedroomsIcon} alt="bedroomsIcon" />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {props.bedrooms}
                        </Typography>
                    </InfoBox>

                    <InfoBox>
                        <img src={bathroomsIcon} alt="bathroomssIcon" />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {props.bathrooms}
                        </Typography>
                    </InfoBox>

                    <InfoBox>
                        <img src={spaceIcon} alt="spaceIcon" />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {props.space}
                        </Typography>
                    </InfoBox>
                </Box>
            </Box>
        </HouseBox>
    );
};
