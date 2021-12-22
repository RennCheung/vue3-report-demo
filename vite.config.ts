import { defineConfig } from "vite";
import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

import AutoImport from "unplugin-auto-import/vite";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: "less",
          resolveIcons: true,
        }),
      ],
      dirs: ["src/components", "src/common/components"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "./types/components.d.ts",
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue\??/, // .vue
      ],
      imports: ["vue", "vue-router"],
      dts: "./types/auto-imports.d.ts",
    }),
  ],
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    open: true,
    https: false,
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "ant-design-vue"],
  },
});
