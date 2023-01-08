// @flow
import React from 'react';
import { TransactionWaitingService } from '../../services/transactionsWaitingService';
import { useCookies } from 'react-cookie';
type Props = {
    idTransactionWaiting: string;
};

export const FormCheckNonce = (props: Props) => {
    const [nonce, setNonce] = React.useState('');
    const [accessToken] = useCookies(['accessToken']);
    const [hash, setHash] = React.useState('');
    const handleNonceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNonce(e.target.value);
    };
    const handleSubmitCheck = (nonce: string) => {
        new TransactionWaitingService(accessToken.accessToken)
            .postCheckNonce(props.idTransactionWaiting, nonce)
            .then((res) => {
                if (res) {
                    setHash(res.hash);
                } else {
                }
            });
    };

    return (
        <div className={'m-2 md:m10 p-2 md:p-10 bg-white rounded-2xl'}>
            <h3 className={'text-2xl font-bold text-left'}>Form Check Nonce</h3>
            {hash && (
                <div className={'mt-4'}>
                    <span className={'text-gray-900 font-bold'}>
                        Hash256 of your result is:{' '}
                        <span className={'font-extrabold text-blue-500 text-2xl'}>{hash}</span>
                    </span>
                </div>
            )}
            <div className={'mt-4'}>
                <form className="flex items-center">
                    <input
                        type="text"
                        placeholder="Enter your nonce"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 py-4"
                        onChange={handleNonceChange}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmitCheck(nonce);
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none py-4 focus:shadow-outline"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
