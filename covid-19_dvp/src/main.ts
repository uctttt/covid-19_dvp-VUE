import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import './../public/CSS/adaptive.css'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(store).use(router).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}