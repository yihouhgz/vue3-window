import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: 'packages/index.ts',
      name: 'vue-window',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
  plugins: [
    dts({
      entryRoot: 'packages',
      outDir: 'dist',
    }),
  ],
})
