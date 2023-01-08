// @flow
import React from 'react';
import { Header } from '../components';

type Props = {};
export const Orders = (props: Props) => {
    return (
        <div className={'m-2 md:m10 p-2 md:p-10 bg-white rounded-2xl'}>
            <Header category={'Page'} title={'Order'} />
            <div className={'overflow-x-auto'}>
                <table className={'table-auto w-full'}>
                    <thead>
                        <tr>
                            <th className={'px-4 py-2'}>ID</th>
                            <th className={'px-4 py-2'}>Name</th>
                            <th className={'px-4 py-2'}>Email</th>
                            <th className={'px-4 py-2'}>Status</th>
                            <th className={'px-4 py-2'}>Total</th>
                            <th className={'px-4 py-2'}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(100)].map((_, index) => (
                            <tr key={index}>
                                <td className={'border px-4 py-2'}>{index}</td>
                                <td className={'border px-4 py-2'}>John Doe</td>
                                <td className={'border px-4 py-2'}>
                                    <a href={'mailto:nam@m.com'}>
                                        <span className={'text-blue-500'}>nam@nam.com</span>
                                    </a>
                                </td>
                                <td className={'border px-4 py-2'}>
                                    <span className={'text-green-500'}>Completed</span>
                                </td>
                                <td className={'border px-4 py-2'}>$ 1,000</td>
                                <td className={'border px-4 py-2'}>
                                    <button
                                        type={'button'}
                                        className={'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'}
                                    >
                                        View
                                    </button>
                                    <button
                                        type={'button'}
                                        className={'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2'}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
