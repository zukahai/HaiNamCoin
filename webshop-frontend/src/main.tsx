import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContextProvider';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <CookiesProvider>
            <AuthProvider>
                <App />
                <ToastContainer />
            </AuthProvider>
        </CookiesProvider>
    </React.StrictMode>,
);
