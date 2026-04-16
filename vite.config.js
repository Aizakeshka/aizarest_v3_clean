import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/aizarest_v3_clean/',
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
})
