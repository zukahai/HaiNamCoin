import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Navbar, Sidebar } from './components';
import { Block, Login, Register, Transaction } from './pages';
import { useStateContext } from './contexts/ContextProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { TransactionDetail } from './pages/TransactionDetail';
import { SendCoin } from './pages/SendCoin';
import { LogOut } from './pages/LogOut';
import { User } from './pages/User';
import { UserProfile } from './pages/UserProfile';
import { AuthProvider, useAuthContext } from './contexts/AuthContextProvider';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { Crypto } from './pages/Charts/Crypto';
import SwaggerUI from 'swagger-ui-react';
import { Api } from './pages/Api';
const App = () => {
    const { activeMenu } = useStateContext();
    const { isLogin, user } = useAuthContext();
    return (
        <div>
            <ToastContainer />
            <BrowserRouter>
                <div className="flex relative dark:bg-main-dark-bg">
                    <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                        {isLogin && (
                            <button
                                style={{ backgroundColor: '#03C9D7', borderRadius: '3px' }}
                                type="button"
                                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                            >
                                Total : <span className={'text-red-600 font-bold'}>{user.totalMoney}</span> HNC
                            </button>
                        )}
                    </div>
                    {activeMenu ? (
                        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                            <Sidebar />
                        </div>
                    ) : (
                        <div className="w-0 dark:bg-secondary-dark-bg">
                            <Sidebar />
                        </div>
                    )}
                    <div
                        className={
                            activeMenu
                                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                        }
                    >
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                            <Navbar />
                        </div>
                        <div className={'min-h-screen max-w-7xl mx-auto px-4  '}>
                            <Routes>
                                <Route path={'/login'} element={<Login />} />
                                <Route path={'/register'} element={<Register />} />
                                <Route path="/block" element={<Block />} />
                                <Route path="/transaction" element={<Transaction />} />
                                <Route path="/transaction/:id" element={<TransactionDetail />} />
                                <Route path="/send-coin" element={<SendCoin />} />
                                <Route path="/user" element={<User />} />
                                <Route path="/user-profile" element={<UserProfile />} />
                                <Route path={'/crypto'} element={<Crypto />} />
                                <Route path="logout" element={<LogOut />} />
                                <Route path={'api'} element={<Api />} />
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
