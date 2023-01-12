import React, { FunctionComponent } from 'react';
import { Header } from '../components/Header';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

interface OwnProps {}

type Props = OwnProps;

export const CreateFont: FunctionComponent<Props> = (props) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [file, setFile] = React.useState<File | null>(null);
    const [image, setImage] = React.useState<File | null>(null);
    const [priceLicense, setPriceLicense] = React.useState(0);
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };
    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(event.target.value));
    };

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    const handleChangePriceLicense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceLicense(parseInt(event.target.value));
    };

    const handleSubmit = () => {};
    return (
        <Box sx={{ py: 10 }}>
            <Header title={'Login'} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px', margin: '0 auto' }}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    name={'name'}
                    value={name}
                    onChange={handleChangeName}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    name={'description'}
                    value={description}
                    onChange={handleChangeDescription}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    name={'price'}
                    value={price}
                    onChange={handleChangePrice}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Price License"
                    variant="outlined"
                    name={'priceLicense'}
                    value={priceLicense}
                    onChange={handleChangePriceLicense}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="File"
                    variant="outlined"
                    name={'file'}
                    type={'file'}
                    onChange={handleChangeFile}
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Image"
                    variant="outlined"
                    name={'image'}
                    type={'file'}
                    onChange={handleChangeImage}
                />
                <button onClick={handleSubmit}>Submit</button>
            </Box>
        </Box>
    );
};
