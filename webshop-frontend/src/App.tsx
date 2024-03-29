import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Guide } from './components/Guide';
import { Properties } from './components/Properties';
import { Footer } from './components/Footer';
import { GetStarted } from './components/GetStarted';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Navbar } from './components/Navbar';
import { FontDetail } from './pages/FontDetail';
import { ConnectWallet } from './pages/ConnectWallet';
import { Logout } from './pages/Logout';
import { CreateFont } from './pages/CreateFont';
function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/font/:id" element={<FontDetail />} />
                    <Route path="/connect-wallet" element={<ConnectWallet />} />
                    <Route path="/create-font" element={<CreateFont />} />
                    <Route
                        path="/"
                        element={
                            <>
                                <Properties />
                                <Guide />
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
            <GetStarted />
            <Footer />
        </>
    );
}

export default App;
