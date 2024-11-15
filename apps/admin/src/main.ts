import App from '@/App.vue'
import naive from 'naive-ui'
import { router } from "@/routes"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "@/assets/styles/index.scss"
import 'nprogress/nprogress.css'
import 'virtual:uno.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(naive)
app.use(router)
app.mount('#app')
