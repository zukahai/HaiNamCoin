// @flow
import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Card } from '@mui/material';
import { ApiService } from '../services/ApiService';
import { FontT } from '../pages/FontDetail';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

type Props = {
    type: string;
    font: FontT;
};
export const SendBuyCoin = (props: Props) => {
    const [privateKey, setPrivateKey] = React.useState('');
    const [accessToken, setAccessToken] = useCookies(['accessToken']);
    const [loading, setLoading] = React.useState(false);
    let handleSubmit = async () => {
        console.log('submit');
        const data = {
            private_key: privateKey,
            value: props.type === '1' ? props.font.price : props.font.price_license,
            to: props.font.user.id,
            font_id: props.font.id,
            type: props.type,
        };
        try {
            loading && setLoading(true);
            const dataRespone = await new ApiService().createSmartContract(accessToken.accessToken, data);
            if (dataRespone) {
                console.log(dataRespone);
                toast.success('Waiting for transaction to be confirmed');
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
            toast.error('Transaction failed');
            setLoading(false);
        }
    };
    return (
        <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}>Loading...</Box>}
            <TextField
                label="Private Key"
                variant="outlined"
                onChange={(e) => setPrivateKey(e.target.value)}
                value={privateKey}
            />
            <Box sx={{ display: 'flex' }}>
                <Button
                    variant={'contained'}
                    sx={{ mt: 4, backgroundColor: '#000339', color: '#fff' }}
                    onClick={handleSubmit}
                >
                    Send Buy Font
                </Button>
            </Box>
        </Card>
    );
};
