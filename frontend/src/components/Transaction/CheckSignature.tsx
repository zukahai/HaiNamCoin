import React, { FunctionComponent } from 'react';
import { TransactionWaitingService } from '../../services/transactionsWaitingService';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { convertUpdatedTime, validateSignatureCheck } from '../utils/date';

interface OwnProps {
    publicKey: string;
}

type Props = OwnProps;

export const CheckSignature: FunctionComponent<Props> = (props) => {
    const [accessToken] = useCookies(['accessToken']);
    const [signature, setSignature] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState({
        from: '',
        to: '',
        value: '',
        time: '',
    });
    const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSignature(e.target.value);
    };
    const convertTime = (time: string | undefined) => {
        const date = new Date();
        date.setTime(Number(time));
        return date.toLocaleString();
    };
    const handleSubmit = () => {
        setLoading(true);
        new TransactionWaitingService(accessToken.accessToken)
            .checkSignature(props.publicKey, signature)
            .then((res) => {
                console.log(res);
                setResult(validateSignatureCheck(res.data.data));
                setLoading(false);
            })
            .catch((err) => {
                toast.error('Check signature failed');
            });
    };

    return (
        <div className={'p-2 md:p-10 bg-white rounded-2xl'}>
            <h3 className={'text-2xl font-bold text-left'}>Check Signature</h3>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
            ) : (
                <div>
                    <div className={'mt-4'}>
                        <textarea
                            placeholder="Enter your signature"
                            className={
                                'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none focus:shadow-outline-blue active:text-gray-700 active:bg-white active:border-gray-300'
                            }
                            value={signature}
                            onChange={handleSignatureChange}
                            rows={8}
                        />
                        {result.from && (
                            <div className={'mt-4 text-left'}>
                                <div className=" mx-auto p-4 bg-white rounded-lg shadow-lg">
                                    <div className="mb-4 px-4 py-2 bg-gray-100 rounded-lg">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">From:</label>
                                        <p className="text-gray-700 text-base font-bold mb-2">Email: {result?.from}</p>
                                    </div>
                                    <div className="mb-4 px-4 py-2 bg  -gray-100 rounded-lg">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">To:</label>
                                        <p className="text-gray-700 text-base font-bold mb-2">Email: {result?.to}</p>
                                    </div>
                                    <div className="mb-4 px-4 py-2 bg-gray-100 rounded-lg">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
                                        <p className="text-gray-700 text-base font-bold mb-2 color-red">
                                            {convertTime(result?.time)}
                                        </p>
                                    </div>

                                    <div className="mb-4 px-4 py-2 bg-gray-100 rounded-lg">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Value:</label>
                                        <p className="text-gray-700 text-base font-bold mb-2 color-red">
                                            {result?.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className={'mt-4'}>
                            <button
                                onClick={handleSubmit}
                                className={
                                    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none  focus:shadow-outline ml-2'
                                }
                            >
                                Check Signature
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
