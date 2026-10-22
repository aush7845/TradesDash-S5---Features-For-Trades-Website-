import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// singlefile: build output is ONE html file that opens by double-click (file://)
export default defineConfig({ base: "./", plugins: [react(), tailwindcss(), viteSingleFile()] });
