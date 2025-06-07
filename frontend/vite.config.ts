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
  }
})
