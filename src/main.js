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
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    if (config.data && config.data.constructor === FormData) {
      return config
    }
    if (!config.data) {
      config.data = {}
    }
  }
  return config
},
error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  let data = response.data
  if (data.url && data.url.includes('login')) {
    clearUser()
    router.replace({ name: 'Login' })
  } else {
    if (typeof data === 'object' && data.status !== 1) {
      Vue.prototype.$message.error(data.msg)
      return Promise.reject(data.msg)
    }
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
