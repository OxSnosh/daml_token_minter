import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    resolve: {
        // Keep symlinks unresolved so daml.js/* workspace packages are
        // treated as node_modules and go through Vite's CJS→ESM optimizer
        preserveSymlinks: true,
    },
    server: {
        host: '127.0.0.1',
        port: 3000,
        strictPort: true,
        proxy: {
            '/v1': {
                target: 'http://127.0.0.1:7575',
                changeOrigin: true,
                ws: true,  // proxy WebSocket upgrades for /v1/stream/*
            },
        },
    },
    optimizeDeps: {
        include: [
            '@daml/ledger',
            '@daml/react',
            '@daml/types',
            '@daml.js/spcx-equity-1.0.0',
            '@mojotech/json-type-validation',
        ],
    },
})
