// @flow
import React from 'react';
import { SendCoinForm } from '../components/Transaction/SendCoinForm';
import { Auth, Header } from '../components';

type Props = {};
export const SendCoin = (props: Props) => {
    React.useEffect(() => {
        document.title = 'Send Coin';
    }, []);
    return (
        <div className={'m-2 md:m10 p-2 md:p-10 bg-white rounded-2xl max-w-screen-2xl'}>
            <Auth />
            <Header category={'Transaction'} title={'Send Coin'} />
            <SendCoinForm />
        </div>
    );
};
