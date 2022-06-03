import {createApp} from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {createPinia} from "pinia/dist/pinia";
import router from "@/router/router";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import "../src/assets/icont/iconfont.css";
import "../src/assets/icont/iconfont";

const app = createApp(App);

app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}