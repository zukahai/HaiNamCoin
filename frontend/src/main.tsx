import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { AuthProvider } from './contexts/AuthContextProvider';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); //
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ContextProvider>
                <App />
            </ContextProvider>
        </AuthProvider>
    </React.StrictMode>,
);
