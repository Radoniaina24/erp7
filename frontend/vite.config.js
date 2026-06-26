import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const monorepoRoot = path.resolve(rootDir, '..')
const require = createRequire(import.meta.url)

function resolvePackage(packageName) {
  return path.dirname(
    require.resolve(`${packageName}/package.json`, {
      paths: [rootDir, monorepoRoot],
    }),
  )
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
      react: resolvePackage('react'),
      'react-dom': resolvePackage('react-dom'),
      '@tanstack/react-query': resolvePackage('@tanstack/react-query'),
      'react-router-dom': resolvePackage('react-router-dom'),
      zustand: resolvePackage('zustand'),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    fs: {
      allow: [monorepoRoot],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-dev-runtime',
      '@tanstack/react-query',
      'react-router-dom',
      'zustand',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      'lucide-react',
      'radix-ui',
    ],
  },
})
