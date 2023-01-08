// @flow
import React from 'react';
import { BlockI, BlockService } from '../../services/blockService';
import { convertUpdatedTime } from '../utils/date';

type Props = {
    userId: string;
    userEmail: string;
};
export const BlockHistory = (props: Props) => {
    const [blockHistory, setBlockHistory] = React.useState<BlockI[]>([]);
    const accessToken = localStorage.getItem('accessToken') ?? '';
    React.useEffect(() => {
        new BlockService(accessToken).findByUserId(props.userId).then((res: BlockI[]) => {
            setBlockHistory(res);
        });
    }, [props.userId, accessToken]);
    return (
        <div className={'p-2 md:p-10 bg-white rounded-2xl'}>
            <h3 className={'text-2xl font-bold'}>Block History</h3>
            <div className={'overflow-x-auto'}>
                <table className={'table-auto w-full relative'}>
                    <thead>
                        <tr>
                            <th className={'px-4 py-2'}>From</th>
                            <th className={'px-4 py-2'}>To</th>
                            <th className={'px-4 py-2'}>Value</th>
                            <th className={'px-4 py-2'}>Time</th>
                            <th className={'px-4 py-2'}>Prehash</th>
                            <th className={'px-4 py-2'}>Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blockHistory.map((block, index) => (
                            <tr key={index} className={'hover:bg-gray-100'}>
                                <td
                                    className={
                                        'border px-4 py-2 font-bold' +
                                        (block.from.email === props.userEmail ? ' font-bold text-red-500' : '')
                                    }
                                >
                                    {block.from.email}
                                </td>
                                <td
                                    className={
                                        'border px-4 py-2 font-bold' +
                                        (block.to.email === props.userEmail ? ' font-bold text-red-500' : '')
                                    }
                                >
                                    {block.to.email}
                                </td>
                                <td className={'border px-4 py-2 '}>{block.value}</td>
                                <td className={'border px-4 py-2'}>{convertUpdatedTime(block.createdAt)}</td>
                                <td className={'border px-4 py-2'}>{block.preHashCode}</td>
                                <td className={'border px-4 py-2'}>{block.hashCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
