import {
  createApp,
  createVNode
  // ref,
  // getCurrentInstance
} from 'vue'
import LoadingComponent from './main.vue'

export function mountComponent (Comp, className = 'mount-node') {
  const app = createApp(Comp)
  const mountNode = document.createElement('div')
  mountNode.className = className

  document.body.appendChild(mountNode)

  return {
    instance: app.mount(mountNode),
    unmount () {
      app.unmount(mountNode)
      document.body.removeChild(mountNode)
    }
  }
}

function createInstance () {
  // const Comp = {
  //   setup () {
  //     const visible = ref(false)
  //     const defaultProps = {
  //       visible: visible.value,
  //       text: 'loading...',
  //       'onUpdate:visible': (val) => {
  //         visible.value = val
  //       }
  //     }

  //     let props = {}

  //     const open = (opts) => {
  //       props = opts
  //       visible.value = true
  //     }

  //     const close = () => {
  //       visible.value = true
  //     }

  //     // rewrite render function
  //     getCurrentInstance().render = () => {
  //       return createVNode(LoadingComponent, {
  //         ...defaultProps,
  //         ...props
  //       })
  //     }

  //     return {
  //       open,
  //       close
  //     }
  //   }
  // }

  const Comp = {
    data () {
      return {
        props: {},
        visible: true
      }
    },
    methods: {
      open (opts) {
        this.visible = true
        this.props = opts
      },
      close () {
        this.visible = false
      }
    },
    render () {
      const defaultProps = {
        visible: this.visible,
        text: 'loading...'
      }
      return createVNode(LoadingComponent, {
        ...defaultProps,
        ...this.props
      })
    }
  }

  const { instance } = mountComponent(Comp)
  return instance
}

let ins = null
function getInstance () {
  if (ins) {
    return ins
  }
  ins = createInstance()
  return ins
}

export default {
  open (options) {
    return getInstance(options)
  },
  close () {
    ins && ins.close()
  }
}

// let app = null
// let mountNode = null
// export default {
//   open (options = {}) {
//     mountNode = document.createElement('div')
//     document.body.appendChild(mountNode)
//     app = createApp(LoadingComponent, {
//       ...options,
//       visible: true,
//       text: 'loading...'
//     })
//     // const node = createVNode(LoadingComponent, {
//     //   ...options,
//     //   visible: true,
//     //   text: 'loading...'
//     // })
//     // console.log('node: ', node)
//     console.log('app: ', app)
//     app.mount(mountNode)
//   },

//   close () {
//     app.unmount(mountNode)
//     document.body.removeChild(mountNode)
//   }
// }
