import Vue from 'vue'
import VueScrollactive from 'vue-scrollactive'
import VueClipboard from 'vue-clipboard2'
import VueLazyload from 'vue-lazyload'

import TDesign from 'tdesign-vue'

import App from './App.vue'
import router from './router'

import '@/styles/index.scss'

import errorImg from '@/assets/images/error.png'
import loadingImg from '@/assets/images/default.gif'

Vue.config.productionTip = false
Vue.use(TDesign)
Vue.use(VueScrollactive)
Vue.use(VueClipboard)

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: errorImg,
    loading: loadingImg,
    attempt: 1
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
