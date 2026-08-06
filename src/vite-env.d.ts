/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_APPCHECK_DEBUG_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
