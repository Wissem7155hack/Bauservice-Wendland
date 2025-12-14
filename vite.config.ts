import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  // Check if we're on GitHub Pages (has homepage in package.json)
  // Or check environment variable
  const isGitHubPages = process.env.GITHUB_PAGES === 'true' || 
                       process.env.VERCEL !== 'true';
  
  return {
    // Dynamic base path
    base: isGitHubPages ? '/Luan-Allround-Service/' : '/',
    
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});