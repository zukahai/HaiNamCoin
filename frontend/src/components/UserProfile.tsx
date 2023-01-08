// @flow
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
type Props = {};
export const UserProfile = (props: Props) => {
    const [accessToken, setAccessToken] = useCookies(['accessToken']);
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        }
    }, [navigate, accessToken]);

    const handleLogout = () => {
        navigate('/logout');
    };
    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={() => handleLogout()}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
