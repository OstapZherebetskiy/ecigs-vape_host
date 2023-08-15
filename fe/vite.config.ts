import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@/common-ui', replacement: path.resolve(__dirname, 'src/common-ui') },
      { find: '@/common', replacement: path.resolve(__dirname, 'src/common') },
      { find: '@/components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@/styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@/api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@/img', replacement: path.resolve(__dirname, 'src/img') },
      { find: '@/pages', replacement: path.resolve(__dirname, 'src/pages') },
    ],
  },
  server: {
    proxy: {
      // NOTE: rewrite http://localhost:5173/api -> http://localhost:8000/api
      '^/api/.*': {
        target: 'http://127.0.0.1:8000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
