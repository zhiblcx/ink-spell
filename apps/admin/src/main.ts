import App from '@/App.vue'
import naive from 'naive-ui'
import { router } from "@/routes"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import "@/assets/styles/index.scss"
import 'nprogress/nprogress.css'
import 'virtual:uno.css'
import i18n from "@/shared/i18n/config"
const app = i18n(createApp(App))
const pinia = createPinia()

app.use(pinia)
app.use(naive)
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')
