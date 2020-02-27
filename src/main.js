import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'

Vue.config.devtools = true
Vue.config.productionTip = false

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://192.168.1.13:5000';
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
