import React from 'react';
import { Header } from '../components';
import { BlockI, BlockService } from '../services/blockService';
import { useLocation } from 'react-router-dom';
import { convertUpdatedTime } from '../components/utils/date';
type Props = {};

export const Block = (props: Props) => {
    const [blocks, setBlocks] = React.useState<BlockI[]>([]);
    const location = useLocation();
    const [currentUrl] = React.useState(location.pathname);
    const accessToken = localStorage.getItem('accessToken') ?? '';
    React.useEffect(() => {
        document.title = 'All Blocks';
        new BlockService(accessToken).findAll().then((res: BlockI[]) => {
            setBlocks(res);
            console.log('call');
        });
    }, [currentUrl, accessToken]);

    return (
        <div className={'m-2 md:m10 p-2 md:p-10 bg-white rounded-2xl max-w-screen-2xl'}>
            <Header category={'Main'} title={'Lịch sử giao dịch'} />
            <div className={'overflow-x-auto'}>
                <table className={'table-auto w-full'}>
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
                        {blocks.map((block, index) => (
                            <tr key={index} className={'hover:bg-gray-100'}>
                                <td className={'border px-4 py-2 font-bold '}>{block.from.email}</td>
                                <td className={'border px-4 py-2 font-bold '}>{block.to.email}</td>
                                <td className={'border px-4 py-2'}>{block.value}</td>
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
