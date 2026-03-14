import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      "/api": {
        // adsb接口代理
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        ws: true,
      },
    }
  }
})
