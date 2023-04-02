// vite.config.js
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
    assetsInclude: ["**/*.mov"],
    plugins: [viteCompression({ algorithm: "brotliCompress" })],
});
