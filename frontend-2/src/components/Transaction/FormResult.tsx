// @flow
import React from 'react';

type Props = {
    handleSubmit: (nonce: string) => void;
};
export const FormResult = (props: Props) => {
    const [result, setResult] = React.useState('');
    const handleResultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResult(e.target.value);
    };

    return (
        <div className={'m-2 md:m10 p-2 md:p-10 bg-white rounded-2xl'}>
            <h3 className={'text-2xl font-bold text-left'}>Form Result</h3>
            <div className={'mt-4'}>
                <form className="flex items-center">
                    <input
                        type="number"
                        placeholder="Enter your result"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 py-4"
                        onChange={handleResultChange}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            props.handleSubmit(result);
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none py-4 focus:shadow-outline"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
