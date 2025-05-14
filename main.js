import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
import request from '@/units/request.js'
import apiUrl from 'siteinfo.js'
Vue.prototype.$request = request
Vue.prototype.$apiUrl = apiUrl.apiroot
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif