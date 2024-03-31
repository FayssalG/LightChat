import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() , mkcert()],
  resolve : {
    alias:{
      '@' : path.resolve(__dirname , './src')
    },
  },
  define:{
    global:'globalThis'
  }
})
