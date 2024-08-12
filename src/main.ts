import './main.css'

import * as Vue from 'vue'
import * as Pinia from 'pinia'

import App from './App.vue'
import router from './router'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const app = Vue.createApp(App)

app.use(Pinia.createPinia())
app.use(router)
app.use(antd)
app.mount('#app')
