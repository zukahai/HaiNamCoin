// @flow
import React from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

type Props = {};
export const Crypto = (props: Props) => {
    React.useEffect(() => {
        document.title = 'Crypto Chart';
    }, []);
    return (
        <div>
            <AdvancedRealTimeChart locale={'vi_VN'} theme="light" timezone={'Asia/Ho_Chi-Minh'} style={'5'} />
        </div>
    );
};
