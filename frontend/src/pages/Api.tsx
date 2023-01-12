import React, { FunctionComponent } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { Auth } from '../components';
interface OwnProps {}

type Props = OwnProps;
const AppUrl = import.meta.env.VITE_REACT_APP_API_URL;
export const Api: FunctionComponent<Props> = (props) => {
    return (
        <div className={'p-2 md:p-10 bg-white rounded-2xl'}>
            <Auth />
            <SwaggerUI
                url={`${AppUrl}/api-json`}
                plugins={[
                    {
                        components: {
                            authorizeBtn: () => null,
                        },
                    },
                ]}
            />
        </div>
    );
};
