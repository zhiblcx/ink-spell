import App from '@/App.vue'
import naive from 'naive-ui'
import { router } from "@/routes"
import { createApp } from 'vue'
import 'virtual:uno.css'

createApp(App).use(naive).use(router).mount('#app')
