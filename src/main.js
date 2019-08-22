import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import { clearUser } from './storage/index'
Vue.use(VueAxios, axios)

Vue.qs = qs
Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  return config
},
error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  let data = response.data
  console.log(data.url)
  if (data.url && data.url.includes('login')) {
    console.log(111)
    clearUser()
    router.replace({ name: 'Login' })
  }
  return response.data
},
error => {
  return Promise.reject(error)
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
