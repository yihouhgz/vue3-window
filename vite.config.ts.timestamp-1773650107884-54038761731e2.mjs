// vite.config.ts
import { defineConfig } from "file:///Users/yihou/Desktop/open/vue-window/node_modules/.pnpm/vite@5.4.21_@types+node@25.5.0/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/yihou/Desktop/open/vue-window/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@25.5.0_rollup@4.55.2_typescript@5.9.3_vite@5.4.21_@types+node@25.5.0_/node_modules/vite-plugin-dts/dist/index.mjs";
import vue from "file:///Users/yihou/Desktop/open/vue-window/node_modules/.pnpm/@vitejs+plugin-vue@6.0.3_vite@5.4.21_@types+node@25.5.0__vue@3.5.27_typescript@5.9.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/yihou/Desktop/open/vue-window/node_modules/.pnpm/@vitejs+plugin-vue-jsx@5.1.3_vite@5.4.21_@types+node@25.5.0__vue@3.5.27_typescript@5.9.3_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: "packages/index.ts",
      name: "vue-window",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"]
    },
    sourcemap: true,
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: { vue: "Vue" }
      }
    }
  },
  plugins: [
    dts({
      entryRoot: "packages",
      outDir: "dist"
    }),
    vue(),
    vueJsx()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveWlob3UvRGVza3RvcC9vcGVuL3Z1ZS13aW5kb3dcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95aWhvdS9EZXNrdG9wL29wZW4vdnVlLXdpbmRvdy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveWlob3UvRGVza3RvcC9vcGVuL3Z1ZS13aW5kb3cvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiAncGFja2FnZXMvaW5kZXgudHMnLFxuICAgICAgbmFtZTogJ3Z1ZS13aW5kb3cnLFxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBpbmRleC4ke2Zvcm1hdH0uanNgLFxuICAgICAgZm9ybWF0czogWydlcycsICdjanMnXSxcbiAgICB9LFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogWyd2dWUnXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7IHZ1ZTogJ1Z1ZScgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIGR0cyh7XG4gICAgICBlbnRyeVJvb3Q6ICdwYWNrYWdlcycsXG4gICAgICBvdXREaXI6ICdkaXN0JyxcbiAgICB9KSxcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKVxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFIsU0FBUyxvQkFBb0I7QUFDM1QsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFFbkIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLFdBQVcsU0FBUyxNQUFNO0FBQUEsTUFDckMsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxRQUNOLFNBQVMsRUFBRSxLQUFLLE1BQU07QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsSUFDVixDQUFDO0FBQUEsSUFDRCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsRUFDVDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
