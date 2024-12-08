
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Particles from "particles.vue3"

import BaiduMap from 'vue-baidu-map-3x'

const app = createApp(App)

app.use(BaiduMap, {
    ak: 'em33i0dgq4OWxPI5Wp5RWd34msR9USHA',
  });
app.use(Particles)
app.use(createPinia())
app.use(router)
app.mount('#app')
