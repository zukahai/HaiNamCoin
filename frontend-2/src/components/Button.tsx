// @flow
import React from 'react';

type Props = {
    color: string;
    bgColor: string;
    borderRadius: string;
    text: string;
    size: string;
};
export const Button = (props: Props) => {
    return (
        <button
            type={'button'}
            className={`text-${props.size} p-4 hover:drop-shadow-xl`}
            style={{ backgroundColor: props.bgColor, color: props.color, borderRadius: props.borderRadius }}
        >
            {props.text}
        </button>
    );
};
