import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000, // 指定端口
    open: true, // 自動開啟瀏覽器
    host: "localhost", // 使用 127.0.0.1 而非 localhost
  },
  base: "/", // 根路徑設置，預設是 "/"
});