import { defineConfig } from 'vite'

export default defineConfig({
  // относительные пути к ассетам — сайт работает под любым префиксом (в т.ч. /test-1/)
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssMinify: true,
    minify: 'esbuild',
  },
})
