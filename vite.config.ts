import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readFileSync } from 'fs'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve : {
    alias:{
      '@' : path.resolve(__dirname , './src')
    },
  },
  define:{
    global:'globalThis'
  },
  server:{
    https:{
      key:readFileSync('./devCert.key'),
      cert:readFileSync('./devCert.crt')
    
    }
  }
  
})
