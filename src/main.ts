import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './roter/index'
import store from './store/index'
import MyPageFour from './components/MyPage.vue'; // 全局引入 Four 的布局
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('MyPageFour', MyPageFour);

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
