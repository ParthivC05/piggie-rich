import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/slots-api': {
        target: 'https://slotslaunch.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/slots-api/, ''),
      },
    },
  },
})