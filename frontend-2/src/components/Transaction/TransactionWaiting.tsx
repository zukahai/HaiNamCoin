// @flow
import React from 'react';
import { TransactionI, TransactionWaitingService } from '../../services/transactionsWaitingService';
import { convertUpdatedTime } from '../utils/date';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

type Props = {};
export const TransactionWaiting = (props: Props) => {
    const [dataTransaction, setDataTransaction] = React.useState<TransactionI[]>([]);
    const [accessToken] = useCookies(['accessToken']);
    const navigate = useNavigate();
    const handleConfirm = (id: string) => {
        // to detail transaction
        navigate(`/transaction/${id}`);
    };
    React.useEffect(() => {
        new TransactionWaitingService(accessToken.accessToken).findAll('0').then((res: TransactionI[]) => {
            setDataTransaction(res);
        });
    }, [accessToken]);
    return (
        <div className={'overflow-x-auto'}>
            <table className={'table-auto w-full relative text-left'}>
                <thead>
                    <tr>
                        <th className={'px-4 py-2'}>From</th>
                        <th className={'px-4 py-2'}>To</th>
                        <th className={'px-4 py-2'}>Value</th>
                        <th className={'px-4 py-2'}>Time</th>
                        <th className={'px-4 py-2'}>Xác nhận</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTransaction.map((item: TransactionI, index: number) => (
                        <tr key={index} className={'border hover:bg-gray-100 min-h-200'}>
                            <td className={'border px-4 py-2 font-bold'}>{item.from.email}</td>
                            <td className={'border px-4 py-2 font-bold'}>{item.to.email}</td>
                            <td className={'border px-4 py-2'}>{item.value}</td>
                            <td className={'border px-4 py-2'}>{convertUpdatedTime(item.createdAt)}</td>
                            <td className={'border px-4 py-2'}>
                                <button
                                    onClick={(event) => {
                                        handleConfirm(item.id);
                                    }}
                                    className={
                                        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
                                    }
                                >
                                    Xác nhận
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
