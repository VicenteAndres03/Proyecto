import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 ESTO ES CRUCIAL: Permite que Vite sea visible en tu red WiFi
    port: 5173  // (Opcional) Asegura el puerto
  }
})
