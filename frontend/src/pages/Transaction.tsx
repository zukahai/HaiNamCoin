// @flow
import React from 'react';
import { Auth, Header } from '../components';
import { TransactionWaiting } from '../components/Transaction/TransactionWaiting';
import { TransactionSuccess } from '../components/Transaction/TransactionSuccess';

type Props = {};
export const Transaction = (props: Props) => {
    const tableData = {
        waiting: false,
        success: false,
    };
    const [dataChange, setDataChange] = React.useState<boolean>(false);
    const [dataTab, setDataTab] = React.useState({ ...tableData, waiting: true });
    const handleChange = (value: string) => {
        setDataTab({ ...tableData, [value]: true });
    };
    React.useEffect(() => {
        if (dataTab.waiting) {
            document.title = 'Transaction Waiting';
        } else if (dataTab.success) {
            document.title = 'Transaction Success';
        }
    }, [dataTab]);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDataChange(!dataChange);
        }, 2000);
        return () => clearTimeout(timer);
    }, [dataChange]);
    return (
        <div className={'m-2 md:m10 p-2 md:p-10 bg-white rounded-2xl'}>
            <Header category={'Transaction'} title={'Transaction'} />
            <Auth />
            <div className="flex justify-between text-center items-center border-2 border-gray-200">
                <div
                    onClick={() => handleChange('waiting')}
                    className={`w-1/2 border-r-2  py-4 px-4 rounded-l-1xl ${
                        dataTab.waiting ? 'bg-blue-500 text-white text-xl' : 'bg-white text-gray-500'
                    }`}
                >
                    <span>Waiting</span>
                </div>

                <div
                    onClick={() => handleChange('success')}
                    className={`w-1/2 border-r-2  py-4 px-4 rounded-l-1xl ${
                        dataTab.success ? 'bg-blue-500 text-white text-xl' : 'bg-white text-gray-500'
                    }`}
                >
                    <span>Success</span>
                </div>
            </div>
            <div className="mt-4">
                {dataTab.waiting && <TransactionWaiting />}
                {dataTab.success && <TransactionSuccess />}
            </div>
        </div>
    );
};
