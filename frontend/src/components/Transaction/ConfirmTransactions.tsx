// @flow
import React from 'react';
import { ConfirmTransactionsI } from '../../services/transactionsWaitingService';
import { convertUpdatedTime } from '../utils/date';
import { ModalConfirm } from './ModalConfirm';

type Props = {
    confirm_transactions: ConfirmTransactionsI[];
    status: number;
};
export const ConfirmTransactions = (props: Props) => {
    const [isModalShow, setIsModalShow] = React.useState(false);
    const [idModal, setIdModal] = React.useState<string>('');
    const handleShowModal = () => {
        setIsModalShow(!isModalShow);
    };

    return (
        <div className={'m-2 md:m10 p-2 md:p-10 bg-white rounded-2xl'}>
            <h3 className={'text-2xl font-bold text-left'}>Confirm Transactions</h3>
            <div className={'mt-4'}>
                {isModalShow && <ModalConfirm setIsShow={handleShowModal} id={idModal} />}
                <table className={'table-auto w-full relative'}>
                    <thead>
                        <tr>
                            <th className={'px-4 py-2'}>Nonce</th>
                            <th className={'px-4 py-2'}>Time</th>
                            {props.status === 0 && <th className={'px-4 py-2'}>Action for result</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {props.confirm_transactions.map((confirm_transaction, index) => (
                            <tr key={index} className={'hover:bg-gray-100'}>
                                <td className={'border px-4 py-2 font-bold'}>
                                    {confirm_transaction.nonce === '-1' ? (
                                        <span className={'text-red-500 text-xl'}>Error</span>
                                    ) : (
                                        <span className={'text-green-500 text-xl'}>{confirm_transaction.nonce}</span>
                                    )}
                                </td>
                                <td className={'border px-4 py-2'}>
                                    {convertUpdatedTime(confirm_transaction.createdAt)}
                                </td>
                                <td className={'border px-4 py-2'}>
                                    {props.status === 0 && (
                                        <button
                                            onClick={() => {
                                                setIsModalShow(true);
                                                setIdModal(confirm_transaction.id);
                                            }}
                                            className={
                                                'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                            }
                                        >
                                            Confirm
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
