import React, { FunctionComponent } from 'react';
import { Button, styled } from '@mui/material';

interface OwnProps {
    backgroundColor: string;
    color: string;
    buttonText: string;
    heroBtn?: boolean;
    guideBtn?: boolean;
    getStartedBtn?: boolean;
}

type Props = OwnProps;

export const CustomButton: FunctionComponent<Props> = (props) => {
    const CustomButton = styled(Button)(({ theme }) => ({
        backgroundColor: props.backgroundColor,
        color: props.color,
        fontWeight: '700',
        fontSize: '14px',
        cursor: 'pointer',
        padding: '0.5rem 1.25rem',
        borderRadius: '7px',
        textTransform: 'none',
        display: 'block',
        border: '2px solid transparent',
        '&:hover': {
            backgroundColor: props.color,
            color: props.backgroundColor,
            borderColor: props.backgroundColor,
        },
        [theme.breakpoints.down('md')]: {
            margin: (props.heroBtn || props.getStartedBtn) && theme.spacing(0, 'auto', 3, 'auto'),
            width: (props.heroBtn || props.getStartedBtn) && '90%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: props.guideBtn && theme.spacing(3),
            width: props.guideBtn && '90%',
        },
    }));

    return <CustomButton onClick={() => props.onClick}>{props.buttonText}</CustomButton>;
};
