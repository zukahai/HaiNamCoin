// @flow
import React from 'react';
import { AuthService, IUser } from '../services/authService';
import { Auth, Header } from '../components';
import { useCookies } from 'react-cookie';

type Props = {};
export const User = (props: Props) => {
    const [accessToken, setAccessToken] = useCookies(['accessToken']);
    const [users, setUsers] = React.useState<IUser[]>([]);
    React.useEffect(() => {
        new AuthService().getAllUsers(accessToken.accessToken).then((res) => {
            setUsers(res.data);
        });
    }, [accessToken]);
    return (
        <div className={'p-2 md:p-10 bg-white rounded-2xl'}>
            <Auth />
            <Header category={'User'} title={'User List'} />
            <div className={'overflow-x-auto'}>
                <table className={'table-auto w-full relative'}>
                    <thead>
                        <tr>
                            <th className={'px-4 py-2'}>Email</th>
                            <th className={'px-4 py-2'}>Name</th>
                            <th className={'px-4 py-2'}>Public Key</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className={'hover:bg-gray-100'}>
                                <td className={'border px-4 py-2 font-bold'}>{user.email}</td>
                                <td className={'border px-4 py-2'}>{user.name}</td>
                                <td className={'border px-4 py-2'}>{user.public_key}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
