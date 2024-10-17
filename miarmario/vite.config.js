import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx', // Cambiar el loader de archivos JS a JSX
    include: /\.jsx?$/, // Incluir archivos JS y JSX
  },
});
