// @flow
import React from 'react';
import { Auth, Header } from '../components';
import { AuthService } from '../services/authService';
import { useCookies } from 'react-cookie';

type Props = {};
export const UserProfile = (props: Props) => {
    const [user, setUser] = React.useState({
        name: '',
        accessToken: '',
        refreshToken: '',
        email: '',
        totalMoney: 0,
        public_key: '',
        private_key: '',
    });
    const [accessToken2, setAccessToken2] = React.useState('');
    const [accessToken, setAccessToken] = useCookies(['accessToken']);
    React.useEffect(() => {
        new AuthService().getCurrentUser(accessToken.accessToken).then((res) => {
            setUser(res.data.user);
        });
    }, [accessToken]);

    async function getAccessToken() {
        const data = await new AuthService().getAccessToken(accessToken.accessToken);
        setAccessToken2(data.data.accessToken);
    }

    return (
        <div className={'p-2 md:p-10 bg-white rounded-2xl'}>
            <Auth />
            <Header category={'User'} title={'User Profile'} />
            <div className=" mx-auto p-4 bg-white rounded-lg shadow-lg">
                <div className="mb-4 px-4 py-2 bg-gray-100 rounded-lg">
                    <p className="text-gray-700 text-base font-bold mb-2">Email: {user?.email}</p>
                    <p className="text-gray-700 text-base font-bold mb-2">Name: {user?.name}</p>
                    <p className="text-gray-700 text-base font-bold mb-2">
                        Public key:<span className={'text-red-600'}> {user?.public_key}</span>
                    </p>
                    <p className="text-gray-700 text-base font-bold mb-2">
                        Private key:<span className={'text-red-600'}> {user?.private_key}</span>
                    </p>
                </div>
            </div>
            <div className=" mx-auto p-4 bg-white rounded-lg shadow-lg mt-4">
                <textarea
                    rows={10}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                    placeholder="Access token"
                    value={accessToken2}
                />
                <button
                    onClick={getAccessToken}
                    className="w-full px-4 py-2 mt-2 font-medium tracking-widest text-white uppercase bg-green-500 shadow-lg focus:outline-none hover:bg-green-600 hover:shadow-none max-w-5xl"
                >
                    Get access token
                </button>
            </div>
        </div>
    );
};
