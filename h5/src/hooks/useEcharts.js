
import { unref, nextTick } from 'vue'
import { tryOnUnmounted, useDebounceFn, useEventListener } from '@vueuse/core'
import { asyncLoadScript } from '@/utils/async-script.js'

const echartsURL = {
  development: '/echarts5.4.2/echarts.min.js',
  production: '/echarts5.4.2/echarts.js'
}[import.meta.env.MODE]

export function useECharts (
  elRef,
  theme = 'default' // 'light' | 'dark' | 'default'
) {
  // const { getCollapsed } = useMenuSetting()

  let chartInstance = null
  let resizeFn = resize
  let removeResizeFn = () => {}

  resizeFn = useDebounceFn(resize, 200)

  function initCharts (t = theme) {
    return new Promise((resolve, reject) => {
      const el = unref(elRef)
      if (!el || !unref(el)) {
        reject(new Error('cannot get dom'))
        return
      }
      asyncLoadScript(echartsURL, window.echarts, err => {
        if (err) {
          reject(new Error('cannot get echarts'))
          return
        }
        chartInstance = window.echarts.init(el, t)
        removeResizeFn = useEventListener(window, 'resize', resizeFn)
        resolve()
      })
    })
  }

  async function setOptions (options, clear = true) {
    await nextTick()
    if (!chartInstance) {
      await initCharts(theme)
    }
    clear && chartInstance?.clear()
    chartInstance?.setOption(options)
  }

  function resize () {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn'
      }
    })
  }

  // watch(getCollapsed, (_) => {
  //   useTimeoutFn(() => {
  //     resizeFn()
  //   }, 300)
  // })

  tryOnUnmounted(() => {
    if (!chartInstance) return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  function getInstance () {
    if (chartInstance) {
      return chartInstance
    }
    if (unref(elRef)) {
      window.echarts.getInstanceByDom(unref(elRef))
    }
    return null
  }

  return {
    setOptions,
    resize,
    echarts: window.echarts,
    getInstance
  }
}
