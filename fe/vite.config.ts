import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@/common', replacement: path.resolve(__dirname, 'src/common') },
      { find: '@/components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@/styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@/api', replacement: path.resolve(__dirname, 'src/api') },
    ],
  },
})
