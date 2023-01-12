import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ContextProvider } from './ConTextProvider';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <CookiesProvider>
            <ContextProvider>
                <App />
                <ToastContainer />
            </ContextProvider>
        </CookiesProvider>
    </React.StrictMode>,
);
