import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.MODEL_URL_Polichinelo': JSON.stringify(env.MODEL_URL_Polichinelo),
      'process.env.API_URL': JSON.stringify(env.API_URL),
    },
    plugins: [react()],
  }
})
