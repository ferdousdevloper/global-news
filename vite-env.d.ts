/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_apiKey: string;
    readonly VITE_authDomain: string;
    readonly VITE_projectId: string;
    readonly VITE_storageBucket: string;
    readonly VITE_messagingSenderId: string;
    readonly VITE_appId: string;
    readonly VITE_IMGBB_API_KEY: string;
    readonly VITE_API_URL: string;
    readonly VITE_Payment_Gateway_PK: string;
    // Add more as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  