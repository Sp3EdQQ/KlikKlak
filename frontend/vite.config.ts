import path from "path"
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import svgr from "vite-plugin-svgr"
import { reactRouter } from "@react-router/dev/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), svgr(), reactRouter()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    // Optymalizacje bundla
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'ui-vendor': ['@radix-ui/react-checkbox', '@radix-ui/react-separator', '@radix-ui/react-slider', '@radix-ui/react-slot'],
          'query': ['@tanstack/react-query'],
          'icons': ['lucide-react'],
        },
      },
    },
    // Zwiększenie limitu ostrzeżenia dla chunków
    chunkSizeWarningLimit: 1000,
    // Minifikacja
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Source maps tylko dla production debug
    sourcemap: false,
  },
  server: {
    host: true,
    port: 5173,
    // Umożliwia dostęp przez subdomenę
    proxy: {}
  },
  // Optymalizacja dla development
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router', '@tanstack/react-query'],
  },
})
