import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Button, Swipe, SwipeItem } from "vant";
import '../public/JS/rem';
import './../public/CSS/adaptive.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(store).use(router).mount('#app');
app.use(Button).use(Swipe).use(SwipeItem);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }