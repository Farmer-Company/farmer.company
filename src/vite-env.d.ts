/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GEMINI_API_KEY: string;
  readonly DISABLE_HMR: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
