/// <reference types="vite/client" />

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly VITE_API_BASE: string
        }
    }
}

export {}
