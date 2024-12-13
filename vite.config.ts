import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": resolve(__dirname, "./src/store/hooks.ts"),
      "@store": resolve(__dirname, "./src/store"),
      "@shared": resolve(__dirname, "./src/shared"),
      "@components": resolve(__dirname, "./src/components"),
    },
  },
});
