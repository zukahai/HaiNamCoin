import React, { useState } from 'react';
import { AuthService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Header } from '../components';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useCookies } from 'react-cookie';

export const Login: React.FC = () => {
    React.useEffect(() => {
        document.title = 'Login';
    }, []);
    const [accessToken, setAccessToken] = useCookies(['accessToken']);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const authService = new AuthService();
    const { isLogin, setUser, setIsLogin, user } = useAuthContext();
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setTimeout(async () => {
            try {
                const data = await authService.login(email, password);

                if (data.error) {
                    setError(data.error);
                    toast.error(data.error);
                } else {
                    setAccessToken('accessToken', data.data.accessToken, { path: '/' });
                    setIsLogin(true);
                    navigate('/block');
                }
            } catch (error) {
                toast.error('Login failed');
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className={'m-2 md:m10 p-2 md:p-10 bg-white rounded-2xl max-w-screen-2xl'}>
                    <Header category={'Login'} title={'Login'} />
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="******************"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
