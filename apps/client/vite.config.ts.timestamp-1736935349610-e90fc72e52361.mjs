// vite.config.ts
import { antdResolver, tanstackQueryResolver, tanstackRouterResolver } from "file:///E:/VSC/newLive/ink-spell/node_modules/.pnpm/@silver-wolf+auto-import@0.0.13_unplugin-auto-import@0.18.3_rollup@4.24.4_webpack-sources@3.2.3_/node_modules/@silver-wolf/auto-import/dist/index.js";
import { clientComponentResolver, clientEnumsResolver, clientI18nResolver } from "file:///E:/VSC/newLive/ink-spell/packages/resolvers/dist/index.js";
import { TanStackRouterVite } from "file:///E:/VSC/newLive/ink-spell/node_modules/.pnpm/@tanstack+router-plugin@1.78.2_vite@5.4.10_@types+node@20.17.5_sass@1.80.6_terser@5.36.0__web_symfod3ien5cg2ziixyhj7k6y4/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import react from "file:///E:/VSC/newLive/ink-spell/node_modules/.pnpm/@vitejs+plugin-react@4.3.3_vite@5.4.10_@types+node@20.17.5_sass@1.80.6_terser@5.36.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import AutoImport from "file:///E:/VSC/newLive/ink-spell/node_modules/.pnpm/unplugin-auto-import@0.18.3_rollup@4.24.4_webpack-sources@3.2.3/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///E:/VSC/newLive/ink-spell/node_modules/.pnpm/vite@5.4.10_@types+node@20.17.5_sass@1.80.6_terser@5.36.0/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "E:\\VSC\\newLive\\ink-spell\\apps\\client";
var DEFAULT_PORT = 6600;
var vite_config_default = defineConfig(({ mode }) => {
  const { VITE_BASE_API_PORT, VITE_BASE_API_PREFIX, VITE_SERVER_URL } = loadEnv(mode, process.cwd());
  return {
    server: {
      port: parseInt(VITE_BASE_API_PORT) || DEFAULT_PORT,
      proxy: {
        [VITE_BASE_API_PREFIX]: {
          ws: true,
          target: VITE_SERVER_URL,
          changeOrigin: true
          // rewrite: path => path.replace(RegExp('^api', ''))
        }
      }
    },
    plugins: [
      react(),
      TanStackRouterVite(),
      AutoImport({
        imports: ["react"],
        resolvers: [
          antdResolver(),
          tanstackQueryResolver(),
          tanstackRouterResolver(),
          clientComponentResolver(),
          clientEnumsResolver(),
          clientI18nResolver()
        ],
        dts: "@types/auto-imports.d.ts",
        eslintrc: {
          enabled: true
        }
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    define: {
      "process.env": loadEnv(mode, process.cwd())
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxWU0NcXFxcbmV3TGl2ZVxcXFxpbmstc3BlbGxcXFxcYXBwc1xcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFZTQ1xcXFxuZXdMaXZlXFxcXGluay1zcGVsbFxcXFxhcHBzXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovVlNDL25ld0xpdmUvaW5rLXNwZWxsL2FwcHMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgYW50ZFJlc29sdmVyLCB0YW5zdGFja1F1ZXJ5UmVzb2x2ZXIsIHRhbnN0YWNrUm91dGVyUmVzb2x2ZXIgfSBmcm9tICdAc2lsdmVyLXdvbGYvYXV0by1pbXBvcnQnXG5pbXBvcnQgeyBjbGllbnRDb21wb25lbnRSZXNvbHZlciwgY2xpZW50RW51bXNSZXNvbHZlciwgY2xpZW50STE4blJlc29sdmVyIH0gZnJvbSAnQGluay1zcGVsbC9yZXNvbHZlcnMnXG5pbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tICdAdGFuc3RhY2svcm91dGVyLXBsdWdpbi92aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuXG5jb25zdCBERUZBVUxUX1BPUlQgPSA2NjAwXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCB7IFZJVEVfQkFTRV9BUElfUE9SVCwgVklURV9CQVNFX0FQSV9QUkVGSVgsIFZJVEVfU0VSVkVSX1VSTCB9ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxuICByZXR1cm4ge1xuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogcGFyc2VJbnQoVklURV9CQVNFX0FQSV9QT1JUKSB8fCBERUZBVUxUX1BPUlQsXG4gICAgICBwcm94eToge1xuICAgICAgICBbVklURV9CQVNFX0FQSV9QUkVGSVhdOiB7XG4gICAgICAgICAgd3M6IHRydWUsXG4gICAgICAgICAgdGFyZ2V0OiBWSVRFX1NFUlZFUl9VUkwsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXG4gICAgICAgICAgLy8gcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoUmVnRXhwKCdeYXBpJywgJycpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgVGFuU3RhY2tSb3V0ZXJWaXRlKCksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgaW1wb3J0czogWydyZWFjdCddLFxuICAgICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgICBhbnRkUmVzb2x2ZXIoKSxcbiAgICAgICAgICB0YW5zdGFja1F1ZXJ5UmVzb2x2ZXIoKSxcbiAgICAgICAgICB0YW5zdGFja1JvdXRlclJlc29sdmVyKCksXG4gICAgICAgICAgY2xpZW50Q29tcG9uZW50UmVzb2x2ZXIoKSxcbiAgICAgICAgICBjbGllbnRFbnVtc1Jlc29sdmVyKCksXG4gICAgICAgICAgY2xpZW50STE4blJlc29sdmVyKClcbiAgICAgICAgXSxcbiAgICAgICAgZHRzOiAnQHR5cGVzL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG4gICAgICB9XG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgICdwcm9jZXNzLmVudic6IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBTLFNBQVMsY0FBYyx1QkFBdUIsOEJBQThCO0FBQ3RYLFNBQVMseUJBQXlCLHFCQUFxQiwwQkFBMEI7QUFDakYsU0FBUywwQkFBMEI7QUFDbkMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLGNBQWMsZUFBZTtBQU50QyxJQUFNLG1DQUFtQztBQVF6QyxJQUFNLGVBQWU7QUFFckIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxFQUFFLG9CQUFvQixzQkFBc0IsZ0JBQWdCLElBQUksUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ2pHLFNBQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNOLE1BQU0sU0FBUyxrQkFBa0IsS0FBSztBQUFBLE1BQ3RDLE9BQU87QUFBQSxRQUNMLENBQUMsb0JBQW9CLEdBQUc7QUFBQSxVQUN0QixJQUFJO0FBQUEsVUFDSixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUE7QUFBQSxRQUVoQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixtQkFBbUI7QUFBQSxNQUNuQixXQUFXO0FBQUEsUUFDVCxTQUFTLENBQUMsT0FBTztBQUFBLFFBQ2pCLFdBQVc7QUFBQSxVQUNULGFBQWE7QUFBQSxVQUNiLHNCQUFzQjtBQUFBLFVBQ3RCLHVCQUF1QjtBQUFBLFVBQ3ZCLHdCQUF3QjtBQUFBLFVBQ3hCLG9CQUFvQjtBQUFBLFVBQ3BCLG1CQUFtQjtBQUFBLFFBQ3JCO0FBQUEsUUFDQSxLQUFLO0FBQUEsUUFDTCxVQUFVO0FBQUEsVUFDUixTQUFTO0FBQUEsUUFDWDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLGVBQWUsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
