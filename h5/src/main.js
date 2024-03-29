import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import eruda from 'eruda'

import App from './App.vue'
import router from './router'
import initPlugin from './plugins'
import './assets/styles/index.less'
import './assets/styles/tailwind.css'

console.log(import.meta.env)
eruda.init()

const app = createApp(App)

initPlugin(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
