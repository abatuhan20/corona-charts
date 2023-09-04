import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  homepage: '/corona-charts/',
  plugins: [react()],
})