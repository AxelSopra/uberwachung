import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.', // racine du projet
  publicDir: 'public', // dossier public
  plugins: [react()]
});
