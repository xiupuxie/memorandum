import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import router from "./router/index";
import '@/assets/iconfont/iconfont.js'

import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);



app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia)
app.use(router)
app.mount('#app')
