// @flow
import React from 'react';
import { useParams } from 'react-router-dom';
import { Auth, Header } from '../components';
import { TransactionWaitingDetailI, TransactionWaitingService } from '../services/transactionsWaitingService';
import { convertUpdatedTime } from '../components/utils/date';
import { BlockHistory } from '../components/Transaction/BlockHistory';
import { ConfirmTransactions } from '../components/Transaction/ConfirmTransactions';
import { FormResult } from '../components/Transaction/FormResult';
import { Question } from '../components/Transaction/Question';
import { FormCheckNonce } from '../components/Transaction/FormCheckNonce';
import { useCookies } from 'react-cookie';
import { CheckSignature } from '../components/Transaction/CheckSignature';
type Props = {};
function callAfterInterval(id: any, accessToken: string) {
    new TransactionWaitingService(accessToken).joinConfirmTransaction(id).then((data) => {});
}
export const TransactionDetail: React.FC = (props: Props) => {
    const { id } = useParams();
    const [option, setOption] = React.useState(0);
    const [dataTransaction, setDataTransaction] = React.useState<TransactionWaitingDetailI>();
    const [dataChange, setDataChange] = React.useState<boolean>(false);
    const [accessToken] = useCookies(['accessToken']);
    React.useEffect(() => {
        const interval = setInterval(() => {
            callAfterInterval(id, accessToken.accessToken);
        }, 2000);
        return () => clearInterval(interval);
    }, [id, accessToken]);

    React.useEffect(() => {
        new TransactionWaitingService(accessToken.accessToken).findOne(id).then((data) => {
            setDataTransaction(data);

            console.log('call');
        });
        setTimeout(() => {
            setDataChange(!dataChange);
        }, 2000);
    }, [id, accessToken, dataChange]);
    const handlePostConfirmTransaction = (nonce: string) => {
        console.log(dataTransaction?.id);
        if (dataTransaction) {
            new TransactionWaitingService(accessToken.accessToken)
                .postConfirmTransaction(dataTransaction.id, nonce)
                .then((res) => {
                    setDataChange(!dataChange);
                });
        }
    };

    return (
        <div className={'m-2 md:m10 p-2 md:p-10 bg-white rounded-2xl h-full '}>
            <Header category={'Transaction'} title={'Transaction Confirm'} />
            <Auth />
            {dataTransaction && (
                <>
                    <div className=" mx-auto p-4 bg-white rounded-lg shadow-lg">
                        <div className="mb-4 px-4 py-2 bg-gray-100 rounded-lg">
                            <label className="block text-gray-700 text-sm font-bold mb-2">From:</label>
                            <p className="text-gray-700 text-base font-bold mb-2">
                                Email: {dataTransaction.from.email}
                            </p>
                            <p className="text-gray-700 text-base font-bold mb-2">
                                Public Key: {dataTransaction.from.public_key}
                            </p>
                        </div>
                        <div className="mb-4 px-4 py-2 bg-gray-100 rounded-lg">
                            <label className="block text-gray-700 text-sm font-bold mb-2">To:</label>
                            <p className="text-gray-700 text-base font-bold mb-2">Email: {dataTransaction.to.email}</p>
                            <p className="text-gray-700 text-base font-bold mb-2">
                                Public key:<span className={'text-red-600'}> {dataTransaction.to.public_key}</span>
                            </p>
                        </div>
                        <div className="mb-4 px-4 py-2 bg-gray-100 rounded-lg">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Value:</label>
                            <p className="text-gray-700 text-base font-bold mb-2 color-red">{dataTransaction.value}</p>
                        </div>
                        <div className="mb-4 px-4 py-2 bg-gray-100 rounded-lg">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
                            <p className="text-gray-700 text-base font-bold mb-2 color-red">
                                {convertUpdatedTime(dataTransaction.createdAt)}
                            </p>
                        </div>
                        <div className="mb-4 px-4 py-2 bg-gray-100 rounded-lg">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Signature:</label>
                            <p className="text-gray-700 text-base font-bold mb-2 color-red">
                                {dataTransaction.signature}
                            </p>
                        </div>
                    </div>
                    <div className=" bg-white rounded-lg shadow-lg mt-10">
                        <BlockHistory userId={dataTransaction.from.id} userEmail={dataTransaction.from.email} />
                    </div>
                    <div className=" bg-white rounded-lg shadow-lg mt-10 text-center mb-10 p-10 ">
                        {dataTransaction.status === 0 ? (
                            <span className={'text-2xl font-bold'}>
                                <button
                                    onClick={() => {
                                        handlePostConfirmTransaction('-1');
                                    }}
                                    className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}
                                >
                                    Notification Error Transaction
                                </button>
                            </span>
                        ) : (
                            <span className={'text-2xl font-bold bg-green-500 text-white p-2 rounded-lg'}>
                                Transaction Success
                            </span>
                        )}
                    </div>
                    <div className={'bg-white rounded-lg shadow-lg mt-10 text-center mb-10 '}>
                        <ConfirmTransactions
                            status={dataTransaction.status}
                            confirm_transactions={dataTransaction.confirm_transactions}
                        />
                    </div>
                    {dataTransaction.status === 0 && (
                        <>
                            <div className={'bg-white rounded-lg shadow-lg mt-10 text-center mb-10 '}>
                                <Question text={dataTransaction.text_question} id={dataTransaction.id} />
                            </div>

                            <div className={'bg-white rounded-lg shadow-lg mt-10 text-center mb-10 '}>
                                <FormCheckNonce idTransactionWaiting={dataTransaction.id}></FormCheckNonce>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg mt-10 text-center mb-10">
                                <CheckSignature publicKey={dataTransaction.from.public_key} />
                            </div>

                            <div className={'bg-white rounded-lg shadow-lg mt-10 text-center mb-10 '}>
                                <FormResult handleSubmit={handlePostConfirmTransaction} />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
