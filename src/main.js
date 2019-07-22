// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './i18n'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import api from './http/index'
Vue.use(api)

// 引入主题色切换
import '../theme/index.css'

import store from './store'

import vueAreaLinkage from 'vue-area-linkage'
import 'vue-area-linkage/dist/index.css'
Vue.use(vueAreaLinkage)

import imgPreview from '@/components/imgPreview'
Vue.use(imgPreview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
