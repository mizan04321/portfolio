import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mizanur.me', // Can be updated with custom domain
  vite: {
    plugins: [tailwindcss()],
  },
});
