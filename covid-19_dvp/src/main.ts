import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './../public/CSS/adaptive.css'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(store).use(router).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}