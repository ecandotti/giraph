import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'
import EnvironmentPlugin from 'vite-plugin-environment'
import path from 'path'

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        define: {
            __APP_ENV__: env.APP_ENV
        },
        plugins: [tsconfigPaths(), VitePWA(), EnvironmentPlugin('all')],
        server: {
            host: true,
            port: 3001
        },
        build: {
            outDir: path.join(__dirname, '../dist')
        }
    }
})
