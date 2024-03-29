import { resolve } from 'path'

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import checker from 'vite-plugin-checker'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { createHtmlPlugin } from 'vite-plugin-html'

// 当前工作目录路径
const root = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, '')
  return {
    plugins: [
      vue(),
      vueJsx(),
      DefineOptions(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        mockPath: 'src/mock',
        localEnabled: true
      }),
      checker({
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,vue}"'
        }
      }),
      AutoImport({
        resolvers: [VantResolver()]
      }),
      Components({
        resolvers: [VantResolver()]
      }),
      // 注入模板数据
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || 'false'
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true,
      port: 5173,
      // 仅在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并 mock
      // doc: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
      proxy: {
        '/api/dev': {
          target: 'http://localhost:5173/api/dev'
        },
        '/api': {
          target: 'http://localhost:8080/api',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `
            @import "@/assets/styles/vars.less";
            @import "@/assets/styles/mixins.less";
          `
        }
      }
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: "import { h } from 'vue';"
    }
  }
})
