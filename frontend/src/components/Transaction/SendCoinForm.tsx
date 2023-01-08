// @flow
import React from 'react';
import { TransactionWaitingService, UserI } from '../../services/transactionsWaitingService';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

type Props = {};
export const SendCoinForm = (props: Props) => {
    const [value, setValue] = React.useState('');
    const [to, setTo] = React.useState('');
    const [accessToken] = useCookies(['accessToken']);
    const [tos, setTos] = React.useState<UserI[]>([]);
    const [publicKey, setPublicKey] = React.useState('');
    const [privateKey, setPrivateKey] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        new TransactionWaitingService(accessToken.accessToken).getAllUser().then((res) => {
            setTos(res);
        });
    }, [accessToken]);
    const handleSubmit = () => {
        setLoading(true);
        new TransactionWaitingService(accessToken.accessToken)
            .createTransaction(value, to, publicKey, privateKey)
            .then((res) => {
                if (res.success) {
                    toast.success('Send coin successfully, please wait for the transaction to be confirmed');
                    setValue('');
                    setPrivateKey('');
                    setPublicKey('');
                } else {
                    toast.error('Send coin failed + ' + res.data.error);
                }
                setLoading(false);
            });
    };
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    function handleToChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setTo(e.target.value);
        const id: string = e.target.value;
        const data = tos.find((item) => {
            console.log(item.id, id);
            return item.id == String(id);
        });
        if (data) {
            setPublicKey(data.public_key);
        }
    }

    const handlePrivateKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrivateKey(e.target.value);
    };

    const handlePublicKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublicKey(e.target.value);
    };

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <form className="flex flex-col">
                    <div className="flex">
                        <div className="w-1/2 mr-2">
                            <label className="block font-bold mb-2 text-gray-700">Send to</label>
                            <select
                                onChange={handleToChange}
                                className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                                {tos.map((to) => (
                                    <option key={to.id} value={to.id} className={'text-gray-700 border-gray-200'}>
                                        {to.email}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block font-bold mb-2 text-gray-700">Value</label>
                            <input
                                type="number"
                                onChange={handleValueChange}
                                className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <label className="block font-bold mb-2 text-gray-700 w-full">Public Key User Send</label>
                        <input
                            value={publicKey}
                            onChange={handlePublicKeyChange}
                            type="text"
                            className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                    </div>

                    <label className="block font-bold mb-2 text-gray-700 w-full">Private Key User Send</label>
                    <input
                        value={privateKey}
                        onChange={handlePrivateKeyChange}
                        type="text"
                        className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />

                    <div className="mt-5 flex items-center justify-between">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            type={'submit'}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 max-w-2xl"
                        >
                            Send
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
