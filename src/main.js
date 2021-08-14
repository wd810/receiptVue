import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from "./router.js"
import axios from "axios"
import VueAxios from "vue-axios"

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
// provide 'axios'
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
