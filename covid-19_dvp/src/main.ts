import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
<<<<<<< HEAD
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import '../public/JS/rem';
import './../public/CSS/adaptive.css'
import 'element-plus/dist/index.css'
=======
import { Button, Swipe, SwipeItem } from "vant";
import './../public/rem';
import './../public/CSS/adaptive.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6

const app = createApp(App)
app.use(ElementPlus)
app.use(store).use(router).mount('#app');
<<<<<<< HEAD
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
=======
app.use(Button).use(Swipe).use(SwipeItem);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
>>>>>>> fe33b65b667055bd0d038682577754640267fcd6
