import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // server: {
    
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:9000/', // Your backend server URL
        
  //     },
  //   },
  // },
  
  plugins: [react()],
});
