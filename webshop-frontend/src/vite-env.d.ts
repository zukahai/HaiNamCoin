/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly BACKEND_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
