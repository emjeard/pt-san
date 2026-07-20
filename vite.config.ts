import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { contactApiPlugin } from "./vite.contact-api";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), contactApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
