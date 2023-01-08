import React, { FunctionComponent } from 'react';
import { Box, styled, Typography } from '@mui/material';

interface OwnProps {}

type Props = OwnProps;

export const Details: FunctionComponent<Props> = (props) => {
    const CustomBox = styled(Box)(({ theme }) => ({}));

    const ImgContainer = styled(Box)(({ theme }) => ({}));

    const LargeText = styled(Typography)(({ theme }) => ({}));

    const SmallText = styled(Typography)(({ theme }) => ({}));

    const TextFlexbox = styled(Box)(({ theme }) => ({}));

    const Divider = styled('div')(({ theme }) => ({}));

    return <></>;
};
