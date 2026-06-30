import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // For GitHub Pages deployment later — set this to your repo name.
  // Example: repo is "audio-emodule" → base: '/audio-emodule/'
  base: '/audio-in-multimedia-emodule',
  server: {
    port: 5173,
    open: false,
  },
})
