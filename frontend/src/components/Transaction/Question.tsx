// @flow
import React from 'react';
import { TransactionWaitingService } from '../../services/transactionsWaitingService';

type Props = {
    text: string;
    id: string;
};
export const Question = (props: Props) => {
    const [option, setOption] = React.useState<boolean>(false);
    const [permutationNonce, setPermutationNonce] = React.useState<string>('');
    React.useEffect(() => {
        new TransactionWaitingService('').checkTimeTransaction(props.id).then((data) => {
            if (data) {
                if (data.option === '2') {
                    setOption(true);
                    setPermutationNonce(data.permutation_nonce);
                }
            }
        });
    });
    return (
        <div className={'p-2 md:p-10 bg-white rounded-2xl'}>
            <h3 className={'text-2xl font-bold text-left'}>Question</h3>
            <div className={'mt-4'}>
                <p className={'text-lg'}>
                    <span className={'text-gray-900 font-bold'}>
                        Find the smallest natural number nonce so that{' '}
                        <span className={'font-extrabold text-blue-500 text-2xl'}>
                            hash256 (<span className={'text-red-600'}>{props.text} nonce</span>)
                        </span>
                        {option && (
                            <>
                                <br />
                                <span className={'text-green-600 font-bold'}>
                                    Nonce is permutation of {permutationNonce}
                                </span>
                            </>
                        )}
                    </span>
                </p>
            </div>{' '}
        </div>
    );
};
