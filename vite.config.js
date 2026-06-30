import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // 'serve' = npm run dev, 'build' = npm run build
  base: mode === 'production' ? '/audio-in-multimedia-emodule/' : '/',
  server: {
    port: 5173,
    open: false,
  },
}))