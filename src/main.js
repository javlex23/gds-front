import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://10.21.51.126:8082'

axios.defaults.baseURL = process.env.API_URL
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8082'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
